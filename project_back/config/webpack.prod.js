const path = require("path");
// const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js"
  },
  // plugin: [
  //   new UglifyjsWebpackPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ]
}