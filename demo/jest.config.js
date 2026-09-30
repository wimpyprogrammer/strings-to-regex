module.exports = {
	restoreMocks: true,
	transform: {
		'^.+\\.[tj]s$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
	},
	preset: 'ts-jest',
	transformIgnorePatterns: ['/node_modules/(?!escape-string-regexp/)'],
	testEnvironment: 'node',
	verbose: true,
};
