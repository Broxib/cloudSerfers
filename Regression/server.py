import http.server
import socketserver
import json
import csv
PORT = 80
import pandas as pd

class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # Print the received request
        print(f"Received request: {self.requestline}")
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        data = json.loads(post_data)
        temperature = data['temperature']
        print(f"Temperature received: {temperature}")
        # Write temperature data to CSV file
        with open('temperature.csv', mode='a', newline='') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow([temperature])
        # Send back a 200 OK response
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        df = pd.read_csv("prediction.csv")
        level = df.iloc[0, 0]
        self.wfile.write(bytes(str(level), 'utf-8'))
httpd = socketserver.TCPServer(("", PORT), RequestHandler)
print(f"Serving on port {PORT}")
httpd.serve_forever()
