const fs = require('fs');
const { getUrlData, getQueryParams } = require('./get-query-params.js');
const getMatchingWords = require('./word-search/get-matching-words');

const VALID_EXTS_TO_CONTENT_TYPES = {
  ico: 'image/x-icon',
};

const getContentTypeFromExt = (ext) => { VALID_EXTS_TO_CONTENT_TYPES[ext] || `text/${ext}`; }

const getFileExt = (pathName) => {
  const regExMatch = /\.(\w+)$/.exec(pathName);
  return regExMatch !== null ? regExMatch[1] : 'plain';
}

function handler(req, res) {
  const urlData = getUrlData(req.url);
  const pathName = urlData.pathname;

  if (pathName === '/') {
    fs.readFile(`${__dirname}/../public/origami.html`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(data);
      }
    });
  } else if (pathName.includes('api/words')) {
    const queryObj = getQueryParams(req.url);
    res.writeHead(200, { 'Content-type': 'text/plain' });
    getMatchingWords(queryObj.match, queryObj.max).pipe(res);
  } else {
    const ext = getFileExt(pathName);
    fs.readFile(`${__dirname}/..${pathName}`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': getContentTypeFromExt(ext) });
        res.end(data);
      }
    });
  }
}

module.exports = handler;
