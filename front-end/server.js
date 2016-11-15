const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, 'index.html'), (_, data) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(data);
  });
});

server.listen({ port: 8080 }, () => {
  console.log('Server running on http://localhost:8080');
});
