import { build } from './trie';

interface ICharTrieData {
	[prefix: string]: ICharTrieData;
}

function convertObjectToTrie(trieData: ICharTrieData): ICharTrie {
	const trieDataPairs = Object.entries(trieData);

	const trie = trieDataPairs.reduce(
		(map, [prefix, suffix]) => map.set(prefix, convertObjectToTrie(suffix)),
		new Map()
	);

	return trie as ICharTrie;
}

describe('build', () => {
	it('returns empty trie when no words', () => {
		const expectedResult = convertObjectToTrie({});
		expect(build([])).toEqual(expectedResult);
	});

	it('returns the entirety of words when no common head', () => {
		const words = ['bar', 'foo'];
		const expectedResult = convertObjectToTrie({
			bar: {},
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns the entirety of repeated equal words', () => {
		const words = ['foo', 'foo', 'foo', 'foo'];
		const expectedResult = convertObjectToTrie({
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns the entirety of multiple, repeated equal words', () => {
		const words = ['bar', 'bar', 'bar', 'bar', 'foo', 'foo', 'foo', 'foo'];
		const expectedResult = convertObjectToTrie({
			bar: {},
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns an empty string for partial words', () => {
		const words = ['foo', 'foobar'];
		const expectedResult = convertObjectToTrie({
			foo: { '': {}, bar: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns the common head of two words', () => {
		const words = ['bar', 'baz'];
		const expectedResult = convertObjectToTrie({
			ba: { r: {}, z: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns multiple depths of partial words', () => {
		const words = ['foo', 'foobar', 'foobaz'];
		const expectedResult = convertObjectToTrie({
			foo: { '': {}, ba: { r: {}, z: {} } },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns the common head of multiple words', () => {
		const words = ['bar', 'baz', 'quux', 'quuz'];
		const expectedResult = convertObjectToTrie({
			ba: { r: {}, z: {} },
			quu: { x: {}, z: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('preserves leading whitespace', () => {
		const words = [' foo', 'foo'];
		const expectedResult = convertObjectToTrie({
			' foo': {},
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('preserves trailing whitespace', () => {
		const words = ['foo ', 'foo'];
		const expectedResult = convertObjectToTrie({
			foo: { '': {}, ' ': {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('preserves mid-word whitespace', () => {
		const words = ['foo bar', 'foobar'];
		const expectedResult = convertObjectToTrie({
			foo: { ' bar': {}, bar: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('is case-sensitive with string heads', () => {
		const words = ['Foo', 'foo'];
		const expectedResult = convertObjectToTrie({
			Foo: {},
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('is case-sensitive with string tails', () => {
		const words = ['foo', 'foO'];
		const expectedResult = convertObjectToTrie({
			fo: { o: {}, O: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('handles complex words', () => {
		const words = [
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
		];
		const expectedResult = convertObjectToTrie({
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
		expect(build(words)).toEqual(expectedResult);
	});
});
