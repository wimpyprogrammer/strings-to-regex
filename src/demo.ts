import { build as buildPattern } from './utils/pattern';
import { build as buildTrie } from './utils/trie';
import { parseString, WhitespaceHandling } from './utils/wordList';

const { Preserve, TrimLeadingAndTrailing } = WhitespaceHandling;

const $input = document.querySelector<HTMLTextAreaElement>('.js-words');
const $delimiter = document.querySelector<HTMLSelectElement>('.js-delimiter');
const $caseSensitive = document.querySelector<HTMLInputElement>('.js-case');
const $trim = document.querySelector<HTMLInputElement>('.js-trim');
const $output = document.querySelector<HTMLTextAreaElement>('.js-output');

function generatePattern(
	words: string,
	delimiter: string,
	whitespace: WhitespaceHandling
): string {
	const wordList = parseString(words, delimiter, whitespace);
	const wordTrie = buildTrie(wordList);
	const pattern = buildPattern(wordTrie);

	return pattern;
}

let clearSuccessIndicatorHandle: number;
function displayPattern(pattern: string) {
	$output.value = pattern;

	// Temporarily style the output box as valid
	$output.classList.add('is-valid');

	clearTimeout(clearSuccessIndicatorHandle);
	clearSuccessIndicatorHandle = setTimeout(
		() => $output.classList.remove('is-valid'),
		1000
	);
}

function onClickGenerate() {
	let words = $input.value;
	const delimiter = $delimiter.selectedOptions[0].value;
	const isCaseSensitive = $caseSensitive.checked;
	const isWhitespaceTrimmed = $trim.checked;

	if (!isCaseSensitive) {
		words = words.toLowerCase();
	}

	const whitespace = isWhitespaceTrimmed ? TrimLeadingAndTrailing : Preserve;

	const pattern = generatePattern(words, delimiter, whitespace);

	displayPattern(pattern);
}

document
	.querySelector('.js-generate')
	.addEventListener('click', onClickGenerate);

(() => {
	const exampleInput =
		'Alabama, Alaska, Arizona, Arkansas, California, ' +
		'Colorado, Connecticut, Delaware, Florida, Georgia';

	$input.value = exampleInput;
	const pattern = generatePattern(exampleInput, ',', TrimLeadingAndTrailing);
	displayPattern(pattern);
})();
