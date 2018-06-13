const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const join = require('path').join;

const currentDirectory = process.cwd();

module.exports = {
    entry: [
        join(currentDirectory, 'src/index.js')
    ],
    output: {
        path: join(currentDirectory, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'env', 'react'],
                            plugins: ['syntax-dynamic-import', 'transform-class-properties']
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
    devServer: {
        contentBase: join(currentDirectory,'dist'),
        port: 3000
      },
      plugins: [ 
          new HtmlWebpackPlugin({
            filename: join(currentDirectory, 'dist/index.html'),
            title: 'react-dynamic-load',
            template: join(currentDirectory, 'src/template.html'),
        }),
          new webpack.HotModuleReplacementPlugin(),
        ]
}