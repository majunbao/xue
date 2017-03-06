module.exports = {
  entry: "./src/root",
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  }
}