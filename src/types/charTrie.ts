interface ICharTrieData {
	[prefix: string]: ICharTrieData;
}

type Char = string;
interface ICharTrie extends Map<Char, ICharTrie> {
	[headChar: string]: any | ICharTrie;
}

class CharTrie extends Map<Char, CharTrie> implements ICharTrie {
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

export { Char, CharTrie, ICharTrie };
