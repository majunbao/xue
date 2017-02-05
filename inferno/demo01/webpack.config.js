module.exports = {
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}