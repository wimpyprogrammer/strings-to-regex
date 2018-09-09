interface ICharTrieData {
	[prefix: string]: ICharTrieData;
}

export type Char = string;
export interface ICharTrie extends Map<Char, ICharTrie> {
	[headChar: string]: any | ICharTrie;
}

export class CharTrie extends Map<Char, CharTrie> implements ICharTrie {
	[headChar: string]: any | CharTrie;

	public static create(trieData: ICharTrieData): CharTrie {
		const trieDataPairs = Object.entries(trieData);

		const trie = trieDataPairs.reduce(
			(map, [prefix, suffix]) => map.set(prefix, this.create(suffix)),
			new Map()
		);

		return trie as CharTrie;
	}
}
