import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"

const config: Configuration & DevServerConfiguration = {
  entry: "./src/entrypoints/app.tsx",
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
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
}

export default config
