import { groupByCommonHead } from './string';

describe('groupByCommonHead', () => {
	it('returns empty object when no words', () => {
		expect(groupByCommonHead([])).toEqual({});
	});

	it('returns the entirety of words when no common head', () => {
		const words = ['bar', 'foo'];
		expect(groupByCommonHead(words)).toEqual({
			bar: {},
			foo: {},
		});
	});

	it('returns the entirety of repeated equal words', () => {
		const words = ['foo', 'foo', 'foo', 'foo'];
		expect(groupByCommonHead(words)).toEqual({
			foo: {},
		});
	});

	it('returns the entirety of multiple, repeated equal words', () => {
		const words = ['bar', 'bar', 'bar', 'bar', 'foo', 'foo', 'foo', 'foo'];
		expect(groupByCommonHead(words)).toEqual({
			bar: {},
			foo: {},
		});
	});

	it('returns an empty string for partial words', () => {
		const words = ['foo', 'foobar'];
		expect(groupByCommonHead(words)).toEqual({
			foo: { '': {}, bar: {} },
		});
	});

	it('returns the common head of two words', () => {
		const words = ['bar', 'baz'];
		expect(groupByCommonHead(words)).toEqual({
			ba: { r: {}, z: {} },
		});
	});

	it('returns multiple depths of partial words', () => {
		const words = ['foo', 'foobar', 'foobaz'];
		expect(groupByCommonHead(words)).toEqual({
			foo: { '': {}, ba: { r: {}, z: {} } },
		});
	});

	it('returns the common head of multiple words', () => {
		const words = ['bar', 'baz', 'quux', 'quuz'];
		expect(groupByCommonHead(words)).toEqual({
			ba: { r: {}, z: {} },
			quu: { x: {}, z: {} },
		});
	});

	it('preserves leading whitespace', () => {
		const words = [' foo', 'foo'];
		expect(groupByCommonHead(words)).toEqual({
			' foo': {},
			foo: {},
		});
	});

	it('preserves trailing whitespace', () => {
		const words = ['foo ', 'foo'];
		expect(groupByCommonHead(words)).toEqual({
			foo: { '': {}, ' ': {} },
		});
	});

	it('preserves mid-word whitespace', () => {
		const words = ['foo bar', 'foobar'];
		expect(groupByCommonHead(words)).toEqual({
			foo: { ' bar': {}, bar: {} },
		});
	});

	it('is case-sensitive with string heads', () => {
		const words = ['Foo', 'foo'];
		expect(groupByCommonHead(words)).toEqual({
			Foo: {},
			foo: {},
		});
	});

	it('is case-sensitive with string tails', () => {
		const words = ['foo', 'foO'];
		expect(groupByCommonHead(words)).toEqual({
			fo: { o: {}, O: {} },
		});
	});
});
