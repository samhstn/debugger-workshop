const fs = require('fs');
const http = require('http');
const path = require('path');
const qs = require('querystring');

const generateHTML = (status, message) =>
  `<!doctype html><html><body><h1>${status} ${message}</h1></body><html>`;

const handler = (req, res) => {
  const url = req.url;
  if (url.includes('/name=') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/html' });
        return res.end(generateHTML(500, 'Server Error');
      }
      const name = qs.parse(url).name;
      const finalData = data.replace('$NAME', name);

      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(finalData);
    });
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end(generateHTML(404, Not Found));
  }
};

const server = http.createServer(handler);
