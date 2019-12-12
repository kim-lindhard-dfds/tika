const webpack = require("webpack");
const path = require("path");

const main = env => {
  return {
    entry: {
      main: "./src/index.ts"
    },
    target: "node",
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js"
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", {}],
                sourceMaps: false
              }
            },
            {
              loader: "ts-loader"
            }
          ]
        },

        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", {}],
                sourceMaps: false
              }
            }
          ]
        }
      ]
    }
  };
};

module.exports = [main];
