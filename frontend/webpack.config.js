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
    filename: "[name].main.js",
    path: path.resolve(__dirname, "/dist"),
    clean: true,
  },
};
