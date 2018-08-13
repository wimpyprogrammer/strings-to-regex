import { CharTrie } from '../types/charTrie';
import { build } from './trie';

describe('build', () => {
	it('returns empty trie when no words', () => {
		const expectedResult = CharTrie.create({});
		expect(build([])).toEqual(expectedResult);
	});

	it('returns the entirety of words when no common head', () => {
		const words = ['bar', 'foo'];
		const expectedResult = CharTrie.create({
			bar: {},
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns the entirety of repeated equal words', () => {
		const words = ['foo', 'foo', 'foo', 'foo'];
		const expectedResult = CharTrie.create({
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns the entirety of multiple, repeated equal words', () => {
		const words = ['bar', 'bar', 'bar', 'bar', 'foo', 'foo', 'foo', 'foo'];
		const expectedResult = CharTrie.create({
			bar: {},
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns an empty string for partial words', () => {
		const words = ['foo', 'foobar'];
		const expectedResult = CharTrie.create({
			foo: { '': {}, bar: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns the common head of two words', () => {
		const words = ['bar', 'baz'];
		const expectedResult = CharTrie.create({
			ba: { r: {}, z: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns multiple depths of partial words', () => {
		const words = ['foo', 'foobar', 'foobaz'];
		const expectedResult = CharTrie.create({
			foo: { '': {}, ba: { r: {}, z: {} } },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('returns the common head of multiple words', () => {
		const words = ['bar', 'baz', 'quux', 'quuz'];
		const expectedResult = CharTrie.create({
			ba: { r: {}, z: {} },
			quu: { x: {}, z: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('preserves leading whitespace', () => {
		const words = [' foo', 'foo'];
		const expectedResult = CharTrie.create({
			' foo': {},
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('preserves trailing whitespace', () => {
		const words = ['foo ', 'foo'];
		const expectedResult = CharTrie.create({
			foo: { '': {}, ' ': {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('preserves mid-word whitespace', () => {
		const words = ['foo bar', 'foobar'];
		const expectedResult = CharTrie.create({
			foo: { ' bar': {}, bar: {} },
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('is case-sensitive with string heads', () => {
		const words = ['Foo', 'foo'];
		const expectedResult = CharTrie.create({
			Foo: {},
			foo: {},
		});
		expect(build(words)).toEqual(expectedResult);
	});

	it('is case-sensitive with string tails', () => {
		const words = ['foo', 'foO'];
		const expectedResult = CharTrie.create({
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
		const expectedResult = CharTrie.create({
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
