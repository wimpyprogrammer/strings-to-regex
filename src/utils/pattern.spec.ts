import { CharTrie } from '../types/charTrie';
import { build } from './pattern';

describe('build', () => {
	it('returns empty pattern for empty trie', () => {
		const trie = CharTrie.create({});
		expect(build(trie)).toBe('');
	});

	it('returns a basic pattern for a single-level tree', () => {
		const trie = CharTrie.create({ foo: {} });
		expect(build(trie)).toBe('foo');
	});

	it('returns an alternation group for a branching trie', () => {
		const trie = CharTrie.create({ ba: { r: {}, z: {} } });
		expect(build(trie)).toBe('ba(r|z)');
	});

	it('returns an alternation group with an empty option for subset words', () => {
		const trie = CharTrie.create({ ba: { '': {}, z: {} } });
		expect(build(trie)).toBe('ba(|z)');
	});

	it('returns nested alternation groups for deep branches', () => {
		const trie = CharTrie.create({ foo: { '': {}, ba: { r: {}, z: {} } } });
		expect(build(trie)).toBe('foo(|ba(r|z))');
	});

	it('returns a wrapping alternation group for top-level branches', () => {
		const trie = CharTrie.create({ foo: {}, bar: {} });
		expect(build(trie)).toBe('(foo|bar)');
	});

	it('preserves leading whitespace', () => {
		const trie = CharTrie.create({ ' foo': {} });
		expect(build(trie)).toBe(' foo');
	});

	it('preserves trailing whitespace', () => {
		const trie = CharTrie.create({ 'foo ': {} });
		expect(build(trie)).toBe('foo ');
	});

	it('preserves mid-word whitespace', () => {
		const trie = CharTrie.create({ 'foo bar': {} });
		expect(build(trie)).toBe('foo bar');
	});

	it('escapes characters with special meaning in RegEx', () => {
		const specialChars = String.raw`foo.?+|(){}^$\[]bar`;
		const trie = CharTrie.create({ [specialChars]: {} });

		const pattern = String.raw`foo\.\?\+\|\(\)\{\}\^\$\\\[\]bar`;
		expect(build(trie)).toBe(pattern);
	});

	it('processes complex trie', () => {
		const trie = CharTrie.create({
			M: {
				a: { ine: {}, ryland: {}, ssachusetts: {} },
				i: { chigan: {}, nnesota: {}, ss: { issippi: {}, ouri: {} } },
				ontana: {},
			},
			N: {
				e: {
					braska: {},
					vada: {},
					'w ': { Hampshire: {}, Jersey: {}, Mexico: {}, York: {} },
				},
				'orth ': { Carolina: {}, Dakota: {} },
			},
			O: { hio: {}, klahoma: {}, regon: {} },
		});
		const pattern = [
			'(',
			'M(a(ine|ryland|ssachusetts)|i(chigan|nnesota|ss(issippi|ouri))|ontana)',
			'|',
			'N(e(braska|vada|w (Hampshire|Jersey|Mexico|York))|orth (Carolina|Dakota))',
			'|',
			'O(hio|klahoma|regon)',
			')',
		].join('');
		expect(build(trie)).toBe(pattern);
	});
});
