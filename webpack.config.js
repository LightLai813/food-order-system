const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    cache: true,
    context: path.join(__dirname, './src'),
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.[s]?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    },
                }],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, './src/') 
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ // 生成 html 
            template: './index.html', // 樣板文件，因為有預先放 GA tracking code
            filename: '../dist/index.html'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        client: {
            progress: true
        },
        host: '127.0.0.1', 
        port: 3000
    },
};
