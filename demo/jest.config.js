module.exports = {
	restoreMocks: true,
	transform: {
		'^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
};
