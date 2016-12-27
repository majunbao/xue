module.exports = {
  plugins: [
    require('postcss-smart-import')(),
    require('press')(),
    require('autoprefixer')()
  ]
}