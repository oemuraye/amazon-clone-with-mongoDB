import path from 'path'

// module.exports = {
  
//   devServer: {
//     static: {
//       directory: path.join(__dirname, ""),
//     },
//     compress: true,
//     port: 9000,
//   },
// };

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { fileURLToPath } from "url";
import { dirname } from "path";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: {
    app: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
    }),
  ],
  output: {
    filename: "index.js",
    publicPath: path.resolve(__dirname, "/"),
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
