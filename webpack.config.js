const path = require("path");
const { UserscriptPlugin } = require('webpack-userscript');

module.exports = {
    mode: "production",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "Thugware.min.js",
    },
    plugins: [
        new UserscriptPlugin({
            metajs: false,
            headers: {
                name: 'Thugware',
                supportURL: 'https://github.com/crackbob/Thugware',
                description: 'we do a little thugging',
                version: '1.0.0',
                author: 'crackbob',
                match: '*://app.zoom.us/*',
                grant: 'none',
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};