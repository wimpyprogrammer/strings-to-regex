module.exports = {
	restoreMocks: true,
	globals: {
		'ts-jest': {
			isolatedModules: true,
			tsconfig: 'tsconfig.test.json',
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
};
