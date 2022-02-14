import { condense, condenseIgnoreCase } from 'strings-to-regex';
import { autoExpandTextarea } from './utils/auto-expand-field';
import { parseString, WhitespaceHandling } from './utils/wordList';

const { Preserve, TrimLeadingAndTrailing } = WhitespaceHandling;

function getElement<T extends Element>(selector: string): T {
	return document.querySelector(selector) as T;
}

const $form = getElement<HTMLFormElement>('.js-form');
const $input = getElement<HTMLTextAreaElement>('.js-words');
const $delimiter = getElement<HTMLSelectElement>('.js-delimiter');
const $caseSensitive = getElement<HTMLInputElement>('.js-case');
const $trim = getElement<HTMLInputElement>('.js-trim');
const $output = getElement<HTMLTextAreaElement>('.js-output');
const $expandLink = getElement<HTMLAnchorElement>('.js-link-expand');
const $submit = getElement<HTMLButtonElement>('.js-generate');

function generateExpandUrl(delimiter: string, pattern: RegExp): URL {
	const query = new URLSearchParams({
		delimiter,
		numResults: '500',
		pattern: pattern.toString(),
	});
	return new URL(`https://www.wimpyprogrammer.com/regex-to-strings/?${query}`);
}

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
	$output.dispatchEvent(new Event('input'));

	// Temporarily style the output box as valid
	$output.classList.add('is-valid');

	clearTimeout(clearSuccessIndicatorHandle);
	clearSuccessIndicatorHandle = window.setTimeout(
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

	const delimiter = $delimiter.options[$delimiter.selectedIndex].value;
	$expandLink.href = generateExpandUrl(delimiter, pattern).toString();
}
$submit.addEventListener('click', onClickGenerate);

autoExpandTextarea($input);
autoExpandTextarea($output);

((): void => {
	const exampleInput =
		'Alabama, Alaska, Arizona, Arkansas, California, ' +
		'Colorado, Connecticut, Delaware, Florida, Georgia';

	$input.value = exampleInput;
	$input.dispatchEvent(new Event('input'));
	const pattern = generatePattern(exampleInput);
	displayPattern(pattern);

	const delimiter = $delimiter.options[$delimiter.selectedIndex].value;
	$expandLink.href = generateExpandUrl(delimiter, pattern).toString();
})();
