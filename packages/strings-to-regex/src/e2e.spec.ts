import { condense, condenseIgnoreCase } from '.';

describe('condense end-to-end', () => {
	it('builds a case-sensitive RegEx to match strings', () => {
		const stringsToMatch = ['foo', 'foobar', 'Foo', 'fooBarBaz'];
		const matcher = condense(stringsToMatch);

		expect(matcher).toHaveProperty('flags', '');
		expect(matcher).toHaveProperty('source', '(foo(|bar|BarBaz)|Foo)');
	});
});

describe('condenseIgnoreCase end-to-end', () => {
	it('builds a case-insensitive RegEx to match strings', () => {
		const stringsToMatch = ['foo', 'foobar', 'Foo', 'fooBarBaz'];
		const matcher = condenseIgnoreCase(stringsToMatch);

		expect(matcher).toHaveProperty('flags', 'i');
		expect(matcher).toHaveProperty('source', 'foo(|bar(|baz))');
	});
});
