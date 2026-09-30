module.exports = {
	collectCoverageFrom: ['./src/**/?*.(js|ts)', '!**/src/**/?*.d.ts'],
	restoreMocks: true,
	transform: {
		'^.+\\.[tj]s$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
	},
	transformIgnorePatterns: ['/node_modules/(?!escape-string-regexp/)'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
};
