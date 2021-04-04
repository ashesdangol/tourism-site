const { watch } = require("fs")
const path = require("path")
const postCssPlugins = [require("postcss-import"), require("postcss-mixins"), require("postcss-simple-vars"), require("postcss-nested"), require("postcss-hexrgba"), require("autoprefixer")]

module.exports = {
  // path to the file what we want to bundle App.js
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  // watch Html inside any app folder or subfolder and  full relod
  devServer: {
    before: function (app, server) {
      server._watch("./app/**/*.html")
    },
    // for css change on the fly without reload
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0"
    // host allow all devices
    // find local ip of ur PC using ipconfig, IPv4 Address, 192.168.X.X:3000
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader?url=false", { loader: "postcss-loader", options: { postcssOptions: { plugins: postCssPlugins } } }]
      }
    ]
  }
}
