import http.server
import socketserver
import http.client
import json
import os

PORT = 8001
OLLAMA_HOST = "localhost"
OLLAMA_PORT = 11434

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
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
                self.end_headers()
                self.wfile.write(data)
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            finally:
                try:
                    conn.close()
                except Exception:
                    pass
        else:
            self.send_error(404, "Unsupported POST endpoint")

if __name__ == "__main__":
    # Serve files from the workspace root so paths stay the same
    os.chdir("/workspaces/javascript")
    with socketserver.ThreadingTCPServer(("", PORT), ProxyHandler) as httpd:
        print(f"Serving Ollama proxy on port {PORT} (POST /ollama-chat)")
        httpd.serve_forever()
