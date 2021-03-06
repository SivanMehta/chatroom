'use strict';

const webpack = require('webpack')
const path = require('path')

exports.init = (dirname) => {
  const LANG = process.env.LANG || 'en-US'
  const dist = path.join(dirname, 'client', 'public', 'dist')

  return [
  {
    name: 'JS',
    entry: ['whatwg-fetch', path.join(dirname, 'client', 'src', 'app.js')],
    output: {
      filename: path.join(dist, 'build', 'bundle.js')
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.ProvidePlugin({
          "react": "React"
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: true,
          comments: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
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
}
