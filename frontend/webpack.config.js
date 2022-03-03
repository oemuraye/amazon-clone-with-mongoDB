const path = require("path");

// module.exports = {
  
//   devServer: {
//     static: {
//       directory: path.join(__dirname, ""),
//     },
//     compress: true,
//     port: 9000,
//   },
// };

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
    }),
  ],
  output: {
    filename: "./src/index.js",
    publicPath: path.resolve(__dirname, "/"),
    clean: true,
  },
}
