module.exports = {
  'entry': './src/root',
  'output': {
    path: './dist',
    filename: 'bundle.js',
  },
  'resolve': {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  'module': {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ["awesome-typescript-loader"]
      }
    ]
  }
}