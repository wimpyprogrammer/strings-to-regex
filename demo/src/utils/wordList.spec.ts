import { parseString, WhitespaceHandling } from './wordList';

const { Preserve, TrimLeadingAndTrailing } = WhitespaceHandling;

describe('parseString', () => {
	it.each(['', null, undefined])(
		'returns an empty array when input string is %p',
		input => {
			const wordList = parseString(input as string, ',', Preserve);
			expect(wordList).toEqual([]);
		}
	);

	it.each(['', null, undefined])(
		'returns entire input string in array when delimiter is %p',
		testDelimiter => {
			const delimiter = testDelimiter as string;
			const wordList = parseString(' some input string ', delimiter, Preserve);
			expect(wordList).toEqual([' some input string ']);
		}
	);

	it.each([',', '\n', '\t'])(
		'returns entire input string in array when delimiter %p is not present in input string',
		delimiter => {
			const wordList = parseString(' some input string ', delimiter, Preserve);
			expect(wordList).toEqual([' some input string ']);
		}
	);

	it.each([
		['foo,Bar, b@z ', ','],
		['foo	Bar	 b@z ', '\t'],
		['fooaaaBaraaa b@z ', 'aaa'],
	])('splits input string %p by delimiter %p', (inputString, delimiter) => {
		const wordList = parseString(inputString, delimiter, Preserve);
		expect(wordList).toEqual(['foo', 'Bar', ' b@z ']);
	});

	it.each([
		['foo Bar b@z ', ' '],
		['foo  Bar  b@z  ', '  '],
	])('splits input string %p by delimiter %p', (inputString, delimiter) => {
		const wordList = parseString(inputString, delimiter, Preserve);
		expect(wordList).toEqual(['foo', 'Bar', 'b@z', '']);
	});

	it('splits multiline input string by newline delimiter', () => {
		const input = `foo
Bar
 b@z `;

		const wordList = parseString(input, '\n', Preserve);
		expect(wordList).toEqual(['foo', 'Bar', ' b@z ']);
	});

	it('preserves input string whitespace when whitespace handling is preserved', () => {
		const input = ' foo ,	Bar , b @ z	, ';
		const wordList = parseString(input, ',', Preserve);
		expect(wordList).toEqual([' foo ', '	Bar ', ' b @ z	', ' ']);
	});

	it('trims leading and trailing input string whitespace when whitespace handling is trim', () => {
		const input = ' foo ,	Bar , b @ z	, ';
		const wordList = parseString(input, ',', TrimLeadingAndTrailing);
		expect(wordList).toEqual(['foo', 'Bar', 'b @ z', '']);
	});

	it('trims input string whitespace after parsing words', () => {
		const input = '   foo  Bar  b @ z  ';
		const wordList = parseString(input, '  ', TrimLeadingAndTrailing);
		expect(wordList).toEqual(['', 'foo', 'Bar', 'b @ z', '']);
	});
});
