#!/usr/bin/env python3
"""
Unified HTTP server that:
1. Serves static files from the workspace root (like SimpleHTTPServer)
2. Provides /ollama-chat proxy endpoint for AI calls
"""

import http.server
import socketserver
import http.client
import json
import os
import sys

PORT = 8000
OLLAMA_HOST = "localhost"
OLLAMA_PORT = 11434

class UnifiedHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        """Redirect root to the roulette app"""
        if self.path == "/" or self.path == "":
            self.path = "/.github/project1/upload/roulette_analyst_v3.html"
        return super().do_GET()

    def do_POST(self):
        """Handle POST requests for /ollama-chat proxy"""
        if self.path == "/ollama-chat":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)

            try:
                conn = http.client.HTTPConnection(OLLAMA_HOST, OLLAMA_PORT, timeout=300)
                conn.request("POST", "/api/chat", body, {
                    "Content-Type": "application/json"
                })
                resp = conn.getresponse()
                data = resp.read()

                self.send_response(resp.status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(data)
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            finally:
                try:
                    conn.close()
                except Exception:
                    pass
        else:
            self.send_error(404, "Unsupported POST endpoint")

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

if __name__ == "__main__":
    os.chdir("/workspaces/javascript")
    
    with socketserver.ThreadingTCPServer(("", PORT), UnifiedHandler) as httpd:
        print(f"Unified server running on port {PORT}")
        print(f"  - Static files: /workspaces/javascript/")
        print(f"  - Ollama proxy: POST http://localhost:{PORT}/ollama-chat")
        print("")
        httpd.serve_forever()
