#!/usr/bin/env python3
import http.server
import socketserver
import http.client
import json
import os
import ssl

PORT = 8000
OLLAMA_HOST = "localhost"
OLLAMA_PORT = 11434

# Cloud API endpoints
API_ENDPOINTS = {
    "groq": {
        "host": "api.groq.com",
        "path": "/openai/v1/chat/completions",
        "ssl": True
    },
    "openai": {
        "host": "api.openai.com",
        "path": "/v1/chat/completions",
        "ssl": True
    },
    "gemini": {
        "host": "generativelanguage.googleapis.com",
        "ssl": True
        # path built dynamically with model name
    }
}

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)

        if self.path == "/ollama-chat":
            self._proxy_ollama(body)
        elif self.path == "/api/proxy":
            self._proxy_cloud(body)
        else:
            self.send_error(404)

    def _proxy_ollama(self, body):
        """Forward to local Ollama"""
        try:
            conn = http.client.HTTPConnection(OLLAMA_HOST, OLLAMA_PORT, timeout=300)
            conn.request("POST", "/api/chat", body, {"Content-Type": "application/json"})
            resp = conn.getresponse()
            data = resp.read()
            self.send_response(resp.status)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self._send_json_error(500, str(e))
        finally:
            try: conn.close()
            except: pass

    def _proxy_cloud(self, body):
        """Forward to cloud AI providers (Groq, OpenAI, Gemini)"""
        try:
            req = json.loads(body)
            provider = req.get("provider")
            model = req.get("model")
            api_key = req.get("apiKey")
            messages = req.get("messages", [])

            if provider not in API_ENDPOINTS:
                self._send_json_error(400, f"Unknown provider: {provider}")
                return

            ep = API_ENDPOINTS[provider]
            ctx = ssl.create_default_context()

            if provider == "gemini":
                # Gemini uses a different API format
                path = f"/v1beta/models/{model}:generateContent?key={api_key}"
                gemini_body = json.dumps({
                    "contents": [{"parts": [{"text": m["content"]}]} for m in messages]
                }).encode()
                conn = http.client.HTTPSConnection(ep["host"], timeout=120, context=ctx)
                conn.request("POST", path, gemini_body, {"Content-Type": "application/json"})
            else:
                # OpenAI-compatible (Groq, OpenAI)
                path = ep["path"]
                cloud_body = json.dumps({
                    "model": model,
                    "messages": messages,
                    "stream": False
                }).encode()
                headers = {
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                }
                conn = http.client.HTTPSConnection(ep["host"], timeout=120, context=ctx)
                conn.request("POST", path, cloud_body, headers)

            resp = conn.getresponse()
            data = resp.read()
            self.send_response(resp.status)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(data)
        except json.JSONDecodeError:
            self._send_json_error(400, "Invalid JSON body")
        except Exception as e:
            self._send_json_error(502, str(e))
        finally:
            try: conn.close()
            except: pass

    def _send_json_error(self, code, message):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"error": message}).encode())

    def do_GET(self):
        """Serve files normally, but redirect root to the roulette app"""
        if self.path in ('/', ''):
            self.path = '/.github/project1/upload/roulette_analyst_v3.html'
        return super().do_GET()

os.chdir("/workspaces/javascript")
with socketserver.ThreadingTCPServer(("", PORT), Handler) as httpd:
    print(f"Server on port {PORT}")
    httpd.serve_forever()
