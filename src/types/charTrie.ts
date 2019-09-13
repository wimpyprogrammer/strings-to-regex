interface CharTrieData {
	[prefix: string]: CharTrieData;
}

export type Char = string;

export class CharTrie extends Map<Char, CharTrie> {
	public static create(trieData: CharTrieData): CharTrie {
		const trieDataPairs = Object.entries(trieData);

		const trie = trieDataPairs.reduce(
			(map, [prefix, suffix]) => map.set(prefix, this.create(suffix)),
			new Map()
		);

		return trie as CharTrie;
	}
}
