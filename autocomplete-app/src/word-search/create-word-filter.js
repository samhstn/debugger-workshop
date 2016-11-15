const WordFilter = require('./word-filter');

function createWordFilter(fragment, max) {
  const regex = new RegExp(`^${fragment || ''}`, 'i');
  return new WordFilter(regex, max);
}

module.exports = createWordFilter;
