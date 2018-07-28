import { keys, map, partition, uniq } from 'lodash';

type Char = string;
interface ICharTrie extends Record<Char, CharNode> {}
type CharNode = ICharTrie;

const leafNode: CharNode = {};

/**
 * Arrange a head character and its suffixes into a trie.
 * Flatten leaves of the character trie containing a single letter.
 * For example, { f: { o: { o: { '': {}, bar: {} } } } } flattens
 * to { foo: { '': {}, bar: {} } }
 *
 * @param headChar A character prefix
 * @param tailGroup A character trie of suffixes to headChar
 * @returns A character trie with tailGroup branching from headChar
 */
function mergeGroups(headChar: Char, tailGroup: ICharTrie): ICharTrie {
	const tails = keys(tailGroup);
	if (tails.length > 1) {
		return { [headChar]: tailGroup };
	}

	const onlyTail = tails[0];
	return { [headChar + onlyTail]: tailGroup[onlyTail] };
}

/**
 * Parse a list of words to build a trie of common prefixes.
 *
 * @param words A list of words to parse
 * @returns A trie of words grouped by the initial characters they share
 */
function groupUniqueByCommonHead(words: string[]): ICharTrie {
	if (words.length === 0) {
		return leafNode;
	}

	const wordToMatch = words[0];

	if (wordToMatch === '') {
		// End of the target word reached. Include an empty string to signify that
		// a word ends at this spot, and group any remaining words in the trie.
		const [, nonEmptyWords] = partition(words, word => word === '');
		return { '': leafNode, ...groupByCommonHead(nonEmptyWords) };
	}

	// Begin a new trie containing all words starting with the same letter as wordToMatch
	const charToMatch = wordToMatch[0];
	const [wordsMatched, wordsMissed] = partition(words, ['[0]', charToMatch]);

	const tailsMatched = map(wordsMatched, word => word.substring(1));
	const tailsMatchedGrouped = groupByCommonHead(tailsMatched);

	const groupWithChildren = mergeGroups(charToMatch, tailsMatchedGrouped);

	return { ...groupWithChildren, ...groupByCommonHead(wordsMissed) };
}

/** @borrows groupUniqueByCommonHead as groupByCommonHead */
export function groupByCommonHead(words: string[]): ICharTrie {
	const uniqueWords = uniq(words);
	return groupUniqueByCommonHead(uniqueWords);
}
