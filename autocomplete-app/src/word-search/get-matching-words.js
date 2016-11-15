const { createReadStream } = require('fs');
const split = require('split');
const createWordFilter = require('./create-word-filter');

const WORDS_FILE_PATH = `${__dirname}/../../resources/dictionary.txt`;

/**
 * Get stream of matching words
 * @param  {string} fragment word fragment to match
 * @return {WriteStream}          stream of words matching fragment
 */
function getMatchingWords(fragment, max = 10) {
  return createReadStream(WORDS_FILE_PATH)
            .pipe(split())
            .pipe(createWordFilter(fragment, max));
}

module.exports = getMatchingWords;
