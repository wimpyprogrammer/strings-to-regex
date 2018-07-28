type Char = string;
interface ICharTrie extends Record<Char, CharNode> {}
type CharNode = ICharTrie;
