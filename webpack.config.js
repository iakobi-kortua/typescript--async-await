var path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    mode: 'development',
    output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            inject: true,
        }),
    ],
    module: {
    rules: [
        {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
        },
        { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
    ],
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        // Add support for TypeScripts fully qualified ESM imports.
        extensionAlias: {
         ".js": [".js", ".ts"],
         ".cjs": [".cjs", ".cts"],
         ".mjs": [".mjs", ".mts"]
        }
    },
};