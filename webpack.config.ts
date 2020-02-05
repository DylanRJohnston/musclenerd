import ErrorOverlayPlugin from "error-overlay-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"

const config: Configuration & DevServerConfiguration = {
  entry: "./src/entrypoints/app.tsx",
  devtool: "cheap-eval-source-map",
  output: {
    filename: "bundle-[hash].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { transpileOnly: true },
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: { localIdentName: "[path][name]__[local]" } },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new ErrorOverlayPlugin()],
}

export default config
