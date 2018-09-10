import { build as buildPattern } from './utils/pattern';
import { build as buildTrie } from './utils/trie';
import { parseString, WhitespaceHandling } from './utils/wordList';

const { Preserve, TrimLeadingAndTrailing } = WhitespaceHandling;

const $input = document.querySelector<HTMLTextAreaElement>('.js-words');
const $delimiter = document.querySelector<HTMLSelectElement>('.js-delimiter');
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

function displayPattern(pattern: string) {
	$output.value = pattern;
}

function onClickGenerate() {
	const words = $input.value;
	const delimiter = $delimiter.selectedOptions[0].value;
	const isWhitespaceTrimmed = $trim.checked;

	const whitespace = isWhitespaceTrimmed ? TrimLeadingAndTrailing : Preserve;

	const pattern = generatePattern(words, delimiter, whitespace);

	displayPattern(pattern);
}

document
	.querySelector('.js-generate')
	.addEventListener('click', onClickGenerate);
