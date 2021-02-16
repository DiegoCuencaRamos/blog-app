const { merge } =  require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // Is required so that the loader can find the publicPath
                        options: { publicPath: '/' }
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    optimization: {
        // Caching files
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        //Minification
        minimize: true,
        minimizer: [
            `...`, // To extend existing minimizers (i.e. `terser-webpack-plugin`)
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
      },
    devtool: 'source-map',
});