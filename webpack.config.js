const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: {
    app: ["./src/main.ts"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 9001,
    hot: true,
    watchContentBase: true,
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.pug'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@components': path.resolve(__dirname, 'src/components')
    }
  },
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      // TS
      {
        test: /\.ts$/,
        use: ['babel-loader'], 
        exclude: /node_modules/
      },

      // HTML
      {
        test: /\.html$/,
        oneOf: [
          // Within Vue Component
          {
            include: [
              path.resolve(__dirname, "src/components")
            ],
            loader: 'vue-template-loader',
            options: {
              scoped: true,
              transformAssetUrls: {
                img: 'src'
              }
            }
          }
          // Any regular HTML file will be handled by the default loader
        ]
      },

      // PUG
      {
        test: /\.pug$/,
        oneOf: [
          // Within Vue Component
          {
            include: [
              path.resolve(__dirname, "src/components")
            ],
            use: [
              {
                loader: 'vue-template-loader',
                options: {
                  scoped: true,
                  transformAssetUrls: {
                    img: 'src'
                  }
                }
              },
              'pug-html-loader'
            ]
          },
          // Any Regular Pug file
          {
            use: [
              'raw-loader',
              'pug-html-loader'
            ]
          }
        ]
      },

      // CSS
      {
        enforce: 'post',
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      // SCSS
      {
        test: /\.scss$/,
        use: ['postcss-loader', 'sass-loader']
      },
      {
        enforce: 'post',
        test: /\.scss$/,
        use: ['style-loader', 'css-loader']
      },

      // Images
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  }
}