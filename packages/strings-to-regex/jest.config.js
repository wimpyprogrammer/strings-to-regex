module.exports = {
	collectCoverageFrom: ['./src/**/?*.(js|ts)', '!**/src/**/?*.d.ts'],
	restoreMocks: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
			},
		],
	},
};
