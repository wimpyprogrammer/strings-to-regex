import { Char, ICharTrie } from '../types/charTrie';

const leafNode = new Map() as ICharTrie;

function groupWordsByHeadChar(
	words: string[],
	firstChar: string
): [string[], string[]] {
	const matched: string[] = [];
	const missed: string[] = [];

	words.forEach(word => {
		if (word[0] === firstChar) {
			matched.push(word);
		} else {
			missed.push(word);
		}
	});

	return [matched, missed];
}

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
	if (tailGroup.size !== 1) {
		return new Map([[headChar, tailGroup]]) as ICharTrie;
	}

	const [onlyTail, onBranch] = tailGroup.entries().next().value;
	return new Map([[headChar + onlyTail, onBranch]]) as ICharTrie;
}

/**
 * Parse a list of words to build a trie of common prefixes.
 *
 * @param words A list of words to parse
 * @returns A trie of words grouped by the initial characters they share
 */
function buildUnique(words: string[]): ICharTrie {
	if (words.length === 0) {
		return leafNode;
	}

	const wordToMatch = words[0];

	if (wordToMatch === '') {
		// End of the target word reached. Include an empty string to signify that
		// a word ends at this spot, and group any remaining words in the trie.
		const nonEmptyWords = words.filter(word => word !== '');
		return new Map([['', leafNode], ...build(nonEmptyWords)]) as ICharTrie;
	}

	// Begin a new trie containing all words starting with the same letter as wordToMatch
	const charToMatch = wordToMatch[0];
	const [wordsMatched, wordsMissed] = groupWordsByHeadChar(words, charToMatch);

	const tailsMatched = wordsMatched.map(word => word.substring(1));
	const tailsMatchedGrouped = build(tailsMatched);

	const groupWithChildren = mergeGroups(charToMatch, tailsMatchedGrouped);

	return new Map([...groupWithChildren, ...build(wordsMissed)]) as ICharTrie;
}

/** @borrows buildUnique as build */
export function build(words: string[]): ICharTrie {
	const uniqueWords = [...new Set(words)];
	return buildUnique(uniqueWords);
}
