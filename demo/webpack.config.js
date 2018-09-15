module.exports = {
	entry: './src/demo.ts',
	mode: 'production',
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: { compilerOptions: { noEmit: false } },
					},
				],
			},
		],
	},
	output: {
		filename: 'demo.js',
		path: __dirname,
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
};
