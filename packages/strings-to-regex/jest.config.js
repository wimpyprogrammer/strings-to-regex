module.exports = {
	collectCoverageFrom: ['./src/**/?*.(js|ts)', '!**/src/**/?*.d.ts'],
	restoreMocks: true,
	transform: {
		'^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
};
