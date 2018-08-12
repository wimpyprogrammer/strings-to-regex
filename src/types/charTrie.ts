type Char = string;
interface ICharTrie extends Map<Char, ICharTrie> {
	[headChar: string]: any | ICharTrie;
}
