module.exports = {
	restoreMocks: true,
	preset: 'ts-jest',
	transform: {
		'^.+\\.[tj]s$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
	},
	transformIgnorePatterns: ['/node_modules/(?!escape-string-regexp/)'],
	testEnvironment: 'node',
	verbose: true,
};
