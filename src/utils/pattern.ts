import { CharTrie } from '../types/charTrie';

/**
 * Generate a regular expression pattern that captures the strings
 * represented in a character trie.
 *
 * @param charTrie A character trie
 * @returns A regular expression pattern
 */
export function build(charTrie: CharTrie): string {
	const patternSegments = Array.from(
		[...charTrie],
		([head, suffixTrie]) => `${head}${build(suffixTrie)}`
	);

	let pattern = patternSegments.join('|');

	if (charTrie.size > 1) {
		pattern = `(${pattern})`;
	}

	return pattern;
}
