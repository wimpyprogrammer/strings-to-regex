export enum WhitespaceHandling {
	Preserve,
	TrimLeadingAndTrailing,
}

export function parseString(
	raw: string,
	delimiter: string,
	whitespaceHandling: WhitespaceHandling
): string[] {
	if (!raw) {
		return [];
	}

	if (!delimiter) {
		return [raw];
	}

	let words = raw.split(delimiter);

	if (whitespaceHandling === WhitespaceHandling.TrimLeadingAndTrailing) {
		words = words.map((word) => word.trim());
	}

	return words;
}
