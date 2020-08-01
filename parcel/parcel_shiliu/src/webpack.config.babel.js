const webpack = require('webpack');
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uuid = require('uuid/v4');

const devMode = process.env.NODE_ENV !== 'production';
const token_key = uuid();

module.exports = {
  mode: 'development',
  entry: './src/index',
  devtool: 'cheap-module-source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[name]-[hash].js',
    chunkFilename: 'chunk-[name]-[hash].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.less', '.json'],
    alias: {
      kit: path.resolve(__dirname, '../web_modules/kit'),
      cake: path.resolve(__dirname, '../web_modules/cake')
    }
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader?sourceMap=true',
            options: {
              javascriptEnabled: true
            }
          }
        ],
        include: path.resolve(__dirname, '../../node_modules/antd')
      },
      {
        test: /\.less$/,
        use: [{
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
        exclude: /node_modules/
      },
      // 解析图片资源
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      // 解析 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
      STATIC_URL: JSON.stringify(
        'https://e-static.oss-cn-shanghai.aliyuncs.com'
      ),
      _URL_: JSON.stringify('http://yijiaplatform.cn/backend'), //api.mizhuanba.com
      // _URL_: JSON.stringify('http://testapi.qiyizhuan.com.cn/backend'), // 测试环境
      TOKEN_KEY: JSON.stringify(token_key)
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../../dll/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.ejs'),
      templateParameters: {
        title: 'test'
      }
    }),
    // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
    new AddAssetHtmlPlugin([{
      // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持 globby 字符串
      filepath: require.resolve('../../dll/vendor.dll.js')
    }]),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    inline: true,
    open: true,
    historyApiFallback: true,
    overlay: {
      //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true
    }
  }
};