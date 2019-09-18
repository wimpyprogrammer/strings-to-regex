import { build as buildTrie } from './utils/trie';
import { build as buildPattern } from './utils/pattern';

export function condense(wordList: string[]): RegExp {
	const wordTrie = buildTrie(wordList);
	const pattern = buildPattern(wordTrie);
	return new RegExp(pattern);
}

export function condenseIgnoreCase(wordList: string[]): RegExp {
	const wordListLowercase = wordList.map(word => word.toLowerCase());
	const caseSensitiveRegex = condense(wordListLowercase);
	return new RegExp(caseSensitiveRegex, 'i');
}
