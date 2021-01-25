import { expandAll } from 'regex-to-strings';
import { CharTrie } from '../types/charTrie';
import { build } from './pattern';

describe('build', () => {
	it('returns empty pattern for empty trie', () => {
		const trie = CharTrie.create({});

		const pattern = build(trie);
		expect(pattern).toBe('');

		const expansions = expandAll(pattern);
		expect(expansions).toStrictEqual(['']);
	});

	it('returns a basic pattern for a single-level tree', () => {
		const trie = CharTrie.create({ foo: {} });

		const pattern = build(trie);
		expect(pattern).toBe('foo');

		const expansions = expandAll(pattern);
		expect(expansions).toStrictEqual(['foo']);
	});

	it('returns an alternation group for a branching trie', () => {
		const trie = CharTrie.create({ ba: { r: {}, z: {} } });

		const pattern = build(trie);
		expect(pattern).toBe('ba(r|z)');

		const expansions = expandAll(pattern);
		expect(expansions).toHaveLength(2);
		expect(expansions).toEqual(expect.arrayContaining(['bar', 'baz']));
	});

	it('returns an alternation group with an empty option for subset words', () => {
		const trie = CharTrie.create({ ba: { '': {}, z: {} } });

		const pattern = build(trie);
		expect(pattern).toBe('ba(|z)');

		const expansions = expandAll(pattern);
		expect(expansions).toHaveLength(2);
		expect(expansions).toEqual(expect.arrayContaining(['ba', 'baz']));
	});

	it('returns nested alternation groups for deep branches', () => {
		const trie = CharTrie.create({ foo: { '': {}, ba: { r: {}, z: {} } } });

		const pattern = build(trie);
		expect(pattern).toBe('foo(|ba(r|z))');

		const expansions = expandAll(pattern);
		expect(expansions).toHaveLength(3);
		expect(expansions).toEqual(
			expect.arrayContaining(['foo', 'foobar', 'foobaz'])
		);
	});

	it('returns a wrapping alternation group for top-level branches', () => {
		const trie = CharTrie.create({ foo: {}, bar: {} });

		const pattern = build(trie);
		expect(pattern).toBe('(foo|bar)');

		const expansions = expandAll(pattern);
		expect(expansions).toHaveLength(2);
		expect(expansions).toEqual(expect.arrayContaining(['foo', 'bar']));
	});

	it('preserves leading whitespace', () => {
		const trie = CharTrie.create({ ' foo': {} });

		const pattern = build(trie);
		expect(pattern).toBe(' foo');

		const expansions = expandAll(pattern);
		expect(expansions).toStrictEqual([' foo']);
	});

	it('preserves trailing whitespace', () => {
		const trie = CharTrie.create({ 'foo ': {} });

		const pattern = build(trie);
		expect(pattern).toBe('foo ');

		const expansions = expandAll(pattern);
		expect(expansions).toStrictEqual(['foo ']);
	});

	it('preserves mid-word whitespace', () => {
		const trie = CharTrie.create({ 'foo bar': {} });

		const pattern = build(trie);
		expect(pattern).toBe('foo bar');

		const expansions = expandAll(pattern);
		expect(expansions).toStrictEqual(['foo bar']);
	});

	it('escapes characters with special meaning in RegEx', () => {
		const specialChars = String.raw`foo.?+|(){}^$\[]bar`;
		const trie = CharTrie.create({ [specialChars]: {} });

		const pattern = build(trie);
		expect(pattern).toBe(String.raw`foo\.\?\+\|\(\)\{\}\^\$\\\[\]bar`);

		const expansions = expandAll(pattern);
		expect(expansions).toStrictEqual([specialChars]);
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
		const expectedPattern = [
			'(',
			'M(a(ine|ryland|ssachusetts)|i(chigan|nnesota|ss(issippi|ouri))|ontana)',
			'|',
			'N(e(braska|vada|w (Hampshire|Jersey|Mexico|York))|orth (Carolina|Dakota))',
			'|',
			'O(hio|klahoma|regon)',
			')',
		].join('');

		const pattern = build(trie);
		expect(pattern).toBe(expectedPattern);

		const expansions = expandAll(pattern);
		expect(expansions).toHaveLength(19);
		expect(expansions).toEqual(
			expect.arrayContaining([
				'Maine',
				'Maryland',
				'Massachusetts',
				'Michigan',
				'Minnesota',
				'Mississippi',
				'Missouri',
				'Montana',
				'Nebraska',
				'Nevada',
				'New Hampshire',
				'New Jersey',
				'New Mexico',
				'New York',
				'North Carolina',
				'North Dakota',
				'Ohio',
				'Oklahoma',
				'Oregon',
			])
		);
	});
});
