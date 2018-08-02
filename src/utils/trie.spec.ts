import { build } from './trie';

describe('build', () => {
	it('returns empty trie when no words', () => {
		expect(build([])).toEqual({});
	});

	it('returns the entirety of words when no common head', () => {
		const words = ['bar', 'foo'];
		expect(build(words)).toEqual({
			bar: {},
			foo: {},
		});
	});

	it('returns the entirety of repeated equal words', () => {
		const words = ['foo', 'foo', 'foo', 'foo'];
		expect(build(words)).toEqual({
			foo: {},
		});
	});

	it('returns the entirety of multiple, repeated equal words', () => {
		const words = ['bar', 'bar', 'bar', 'bar', 'foo', 'foo', 'foo', 'foo'];
		expect(build(words)).toEqual({
			bar: {},
			foo: {},
		});
	});

	it('returns an empty string for partial words', () => {
		const words = ['foo', 'foobar'];
		expect(build(words)).toEqual({
			foo: { '': {}, bar: {} },
		});
	});

	it('returns the common head of two words', () => {
		const words = ['bar', 'baz'];
		expect(build(words)).toEqual({
			ba: { r: {}, z: {} },
		});
	});

	it('returns multiple depths of partial words', () => {
		const words = ['foo', 'foobar', 'foobaz'];
		expect(build(words)).toEqual({
			foo: { '': {}, ba: { r: {}, z: {} } },
		});
	});

	it('returns the common head of multiple words', () => {
		const words = ['bar', 'baz', 'quux', 'quuz'];
		expect(build(words)).toEqual({
			ba: { r: {}, z: {} },
			quu: { x: {}, z: {} },
		});
	});

	it('preserves leading whitespace', () => {
		const words = [' foo', 'foo'];
		expect(build(words)).toEqual({
			' foo': {},
			foo: {},
		});
	});

	it('preserves trailing whitespace', () => {
		const words = ['foo ', 'foo'];
		expect(build(words)).toEqual({
			foo: { '': {}, ' ': {} },
		});
	});

	it('preserves mid-word whitespace', () => {
		const words = ['foo bar', 'foobar'];
		expect(build(words)).toEqual({
			foo: { ' bar': {}, bar: {} },
		});
	});

	it('is case-sensitive with string heads', () => {
		const words = ['Foo', 'foo'];
		expect(build(words)).toEqual({
			Foo: {},
			foo: {},
		});
	});

	it('is case-sensitive with string tails', () => {
		const words = ['foo', 'foO'];
		expect(build(words)).toEqual({
			fo: { o: {}, O: {} },
		});
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
		expect(build(words)).toEqual({
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
	});
});
