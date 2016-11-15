const url = require('url');
const querystring = require('querystring');

const getUrlData = (urlString) => url.parse(urlString)

const getQueryParams = (urlString) => {
  const urlObj = getUrlData(urlString);
  querystring.parse(urlObj.query);
}

module.exports = { getUrlData, getQueryParams };
