import { parseString, WhitespaceHandling } from './wordList';

interface TestCase {
	delimiter: string;
	inputString: string;
}

const { Preserve, TrimLeadingAndTrailing } = WhitespaceHandling;

describe('parseString', () => {
	it('returns an empty array when input string is empty', () => {
		function testInput(input: string): void {
			const wordList = parseString(input, ',', Preserve);
			expect(wordList).toEqual([]);
		}

		['', null, undefined].forEach(testInput);
	});

	it('returns entire input string in array when delimiter is empty', () => {
		function testDelimiter(delimiter: string): void {
			const wordList = parseString(' some input string ', delimiter, Preserve);
			expect(wordList).toEqual([' some input string ']);
		}

		['', null, undefined].forEach(testDelimiter);
	});

	it('returns entire input string in array when delimiter is not present in input string', () => {
		function testDelimiter(delimiter: string): void {
			const wordList = parseString(' some input string ', delimiter, Preserve);
			expect(wordList).toEqual([' some input string ']);
		}

		[',', '\n', '\t'].forEach(testDelimiter);
	});

	it('splits input string by delimiter', () => {
		const expectedResult = ['foo', 'Bar', ' b@z '];
		const testCases: TestCase[] = [
			{ delimiter: ',', inputString: 'foo,Bar, b@z ' },
			{ delimiter: '\t', inputString: 'foo	Bar	 b@z ' },
			{ delimiter: 'aaa', inputString: 'fooaaaBaraaa b@z ' },
		];

		function testSplit({ delimiter, inputString }: TestCase): void {
			const wordList = parseString(inputString, delimiter, Preserve);
			expect(wordList).toEqual(expectedResult);
		}

		testCases.forEach(testSplit);
	});

	it('splits input string by whitespace delimiter', () => {
		const expectedResult = ['foo', 'Bar', 'b@z', ''];
		const testCases: TestCase[] = [
			{ delimiter: ' ', inputString: 'foo Bar b@z ' },
			{ delimiter: '  ', inputString: 'foo  Bar  b@z  ' },
		];

		function testSplit({ delimiter, inputString }: TestCase): void {
			const wordList = parseString(inputString, delimiter, Preserve);
			expect(wordList).toEqual(expectedResult);
		}

		testCases.forEach(testSplit);
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
