import { when } from 'jest-when';
import { CharTrie } from './types/charTrie';
import * as patternUtils from './utils/pattern';
import * as trieUtils from './utils/trie';
import { condense, condenseIgnoreCase } from './index';

describe('condense', () => {
	it('builds pattern from trie of words', () => {
		const mockTrie = CharTrie.create({ bar: {} });
		when(jest.spyOn(trieUtils, 'build'))
			.calledWith(['foo'])
			.mockReturnValue(mockTrie);

		const mockPattern = 'baz';
		when(jest.spyOn(patternUtils, 'build'))
			.calledWith(mockTrie)
			.mockReturnValue(mockPattern);

		const result = condense(['foo']);

		expect(result).toHaveProperty('source', mockPattern);
	});

	it('returns case-sensitive RegExp', () => {
		const result = condense(['a', 'B', 'c']);

		expect(result).toHaveProperty('flags', '');
	});
});

describe('condenseIgnoreCase', () => {
	it('builds pattern from trie of lowercased words', () => {
		const mockTrie = CharTrie.create({ bar: {} });
		when(jest.spyOn(trieUtils, 'build'))
			.calledWith(['f', 'o', 'o'])
			.mockReturnValue(mockTrie);

		const mockPattern = 'baz';
		when(jest.spyOn(patternUtils, 'build'))
			.calledWith(mockTrie)
			.mockReturnValue(mockPattern);

		const result = condenseIgnoreCase(['F', 'o', 'O']);

		expect(result).toHaveProperty('source', mockPattern);
	});

	it('returns case-insensitive RegExp', () => {
		const result = condenseIgnoreCase(['a', 'B', 'c']);

		expect(result).toHaveProperty('flags', 'i');
	});
});
