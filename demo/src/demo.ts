import { condense, condenseIgnoreCase } from '../../src/index';
import { parseString, WhitespaceHandling } from './utils/wordList';

const { Preserve, TrimLeadingAndTrailing } = WhitespaceHandling;

const $form = document.querySelector<HTMLFormElement>('.js-form');
const $input = document.querySelector<HTMLTextAreaElement>('.js-words');
const $delimiter = document.querySelector<HTMLSelectElement>('.js-delimiter');
const $caseSensitive = document.querySelector<HTMLInputElement>('.js-case');
const $trim = document.querySelector<HTMLInputElement>('.js-trim');
const $output = document.querySelector<HTMLTextAreaElement>('.js-output');
const $submit = document.querySelector<HTMLButtonElement>('.js-generate');

function generatePattern(words: string): RegExp {
	const delimiter = $delimiter.options[$delimiter.selectedIndex].value;
	const isCaseSensitive = $caseSensitive.checked;
	const isWhitespaceTrimmed = $trim.checked;

	const whitespace = isWhitespaceTrimmed ? TrimLeadingAndTrailing : Preserve;

	const wordList = parseString(words, delimiter, whitespace);

	const fnCondense = isCaseSensitive ? condense : condenseIgnoreCase;
	const pattern = fnCondense(wordList);

	return pattern;
}

let clearSuccessIndicatorHandle: number;
function displayPattern(pattern: RegExp): void {
	$output.value = pattern.toString();

	// Temporarily style the output box as valid
	$output.classList.add('is-valid');

	clearTimeout(clearSuccessIndicatorHandle);
	clearSuccessIndicatorHandle = setTimeout(
		() => $output.classList.remove('is-valid'),
		1000
	);
}

function onClickGenerate(): void {
	try {
		if (!$form.reportValidity()) {
			return;
		}
	} catch (ex) {
		// Ignore browsers that don't support reportValidity()
	}

	const words = $input.value;
	const pattern = generatePattern(words);
	displayPattern(pattern);
}
$submit.addEventListener('click', onClickGenerate);

((): void => {
	const exampleInput =
		'Alabama, Alaska, Arizona, Arkansas, California, ' +
		'Colorado, Connecticut, Delaware, Florida, Georgia';

	$input.value = exampleInput;
	const pattern = generatePattern(exampleInput);
	displayPattern(pattern);
})();
