import { keys, map, partition, uniq } from 'lodash';

type Char = string;
interface ICharTree extends Record<Char, CharLeaf> {}
type CharLeaf = ICharTree;

const terminator: ICharTree = {};

/**
 * Arrange a head character and its suffixes into a tree.
 * Flatten leaves of the character tree containing a single letter.
 * For example, { f: { o: { o: { '': {}, bar: {} } } } } flattens
 * to { foo: { '': {}, bar: {} } }
 *
 * @param headChar A character prefix
 * @param tailGroup A character tree of suffixes to headChar
 * @returns A character tree with tailGroup branching from headChar
 */
function mergeGroups(headChar: Char, tailGroup: ICharTree): ICharTree {
	const tails = keys(tailGroup);
	if (tails.length > 1) {
		return { [headChar]: tailGroup };
	}

	const onlyTail = tails[0];
	return { [headChar + onlyTail]: tailGroup[onlyTail] };
}

/**
 * Parse a list of words to build a tree of common prefixes
 *
 * @param words A list of words to parse
 * @returns A tree of words grouped by the initial characters they share
 */
function groupUniqueByCommonHead(words: string[]): ICharTree {
	if (words.length === 0) {
		return terminator;
	}

	const wordToMatch = words[0];

	if (wordToMatch === '') {
		// End of the target word reached. Include an empty string to signify that
		// a word ends at this spot, and group any remaining words in the tree.
		const [, nonEmptyWords] = partition(words, word => word === '');
		return { '': terminator, ...groupByCommonHead(nonEmptyWords) };
	}

	// Begin a new tree containing all words starting with the same letter as wordToMatch
	const charToMatch = wordToMatch[0];
	const [wordsMatched, wordsMissed] = partition(words, ['[0]', charToMatch]);

	const tailsMatched = map(wordsMatched, word => word.substring(1));
	const tailsMatchedGrouped = groupByCommonHead(tailsMatched);

	const groupWithChildren = mergeGroups(charToMatch, tailsMatchedGrouped);

	return { ...groupWithChildren, ...groupByCommonHead(wordsMissed) };
}

/** @borrows groupUniqueByCommonHead as groupByCommonHead */
export function groupByCommonHead(words: string[]): ICharTree {
	const uniqueWords = uniq(words);
	return groupUniqueByCommonHead(uniqueWords);
}
