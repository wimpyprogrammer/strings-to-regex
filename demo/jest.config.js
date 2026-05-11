module.exports = {
	restoreMocks: true,
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{ isolatedModules: true, tsconfig: 'tsconfig.test.json' },
		],
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
};
