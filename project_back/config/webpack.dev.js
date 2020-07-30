module.exports = {
  mode: "development",
  output: {
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api/": "http://localhost:8080",
      "/admin/": "http://localhost:8080"
    }
  },
  devtool: "source-map"
}
