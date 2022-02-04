const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});

module.exports = {
  mode:'development',
  devServer: {
    compress: true,
    port: 3000,
  },
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },

  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|wav)$/,
        loader: "file-loader",

        options: { name: "[path][name].[ext]" },
      },
    ],
  },
};
