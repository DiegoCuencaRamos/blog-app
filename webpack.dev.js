const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        
        // Enable HTML5 History API: when reloading, page is served instead of 404.
        historyApiFallback: true,

        publicPath: '/'
    }
});