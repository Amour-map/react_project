const path = require("path");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ESLINT_ENABLE = false;
const STYLELINT_ENABLE = false;

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"]
            }
          },
          ...ESLINT_ENABLE ? [{
            loader: "eslint-loader"
          }] : []
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2048,
            outputPath: "img"
          }
        }
      },
      {
        test:/\.(woff|woff2|eot|otf|svg|ttf)$/,
        use:'file-loader'
      }
    ]
  },
  plugins: [
    ...STYLELINT_ENABLE ? [new StyleLintPlugin({
      files: ["**/*.css", "**/*.less", "**/*.scss", "**/*.vue", "**/*.html"]
    })] : [],
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html"
    })
  ]
}
