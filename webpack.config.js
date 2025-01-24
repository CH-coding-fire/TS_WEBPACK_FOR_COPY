const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  target: 'node',  // Important: this tells webpack we're building for Node.js
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv({
      systemvars: true,
      // This is the important part - it will embed the values
      ignoreStub: true,
      defaults: true
    })
    // Alternatively, you can use DefinePlugin directly:
    /*
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(require('dotenv').config().parsed)
    })
    */
  ]
};