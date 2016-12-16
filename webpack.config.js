'use strict';

const webpack = require('webpack');
const path = require('path');

const LANG = process.env.LANG || 'en-US';
const dist = path.join(__dirname, 'client', 'public', 'dist')

module.exports = [
{
  name: 'JS',
  devtool: 'source-map',
  entry: ['whatwg-fetch', path.join(__dirname, 'client', 'src', 'app.js')],
  output: {
    filename: path.join(dist, 'build', 'bundle.js')
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
        "react": "React",
    })
  ],

  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules\/babel[\s\S]*/
        ],
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react')
          ]
        }
      }
    ]}
  }
]
