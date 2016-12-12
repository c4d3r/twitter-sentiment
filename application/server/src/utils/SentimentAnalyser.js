const unified = require('unified');
const retext = require('retext');
const inspect = require('unist-util-inspect');
const sentiment = require('retext-sentiment');
const english = require('retext-english');
const emoji = require('retext-emoji');

const processor = unified().use(english).use(emoji).use(sentiment);

/**
 * Returns { polarity: <value>, valence: '<type>' } where valence is positive|neutral}negative
 * @param text
 */
exports.analyseMessage = (text) => {
    let tree = processor.run(processor.parse(text));
    return tree.data;
};