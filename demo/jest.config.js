module.exports = {
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
