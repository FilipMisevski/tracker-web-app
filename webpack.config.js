const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    return ({
        stats: 'minimal', // Keep console output easy to read.
        entry: './src/index.ts', // Your program entry point

        // Your build destination
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },

        // Config for your testing server
        devServer: {
            compress: true,
            allowedHosts: "all", // If you are using WebpackDevServer as your production server, please fix this line!
            static: false,
            client: {
                logging: "warn",
                overlay: {
                    errors: true,
                    warnings: false,
                },
                progress: true,
            },
            port: 8080, host: '0.0.0.0'
        },

        // Web games are bigger than pages, disable the warnings that our game is too big.
        performance: { hints: false },

        // Enable sourcemaps while debugging
        devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,

        // Minify the code when making a final build
        optimization: {
            minimize: argv.mode === 'production',
            minimizer: [new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: { drop_console: true },
                    output: { comments: false, beautify: false },
                },
            })],
        },


        // Explain webpack how to do Typescript
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx|mjs)$/,
                    // loader: 'ts-loader',
                    include: [
                        path.resolve("src"),
                        path.resolve("node_modules", "@pixi"),
                        path.resolve("node_modules", "pixi.js", "lib", "environment-browser"),
                        path.resolve("node_modules", "pixi.js", "lib", "environment"),
                        path.resolve("node_modules", "pixi.js", "lib", "scene"),
                        path.resolve("node_modules", "pixi.js", "lib", "filters"),
                        path.resolve("node_modules", "pixi.js", "lib", "spritesheet"),
                        path.resolve("node_modules", "pixi.js", "lib", "ticker"),
                        path.resolve("node_modules", "pixi.js", "lib", "extensions"),
                        path.resolve("node_modules", "pixi.js", "lib", "rendering"),
                        path.resolve("node_modules", "pixi.js", "lib", "assets"),
                        path.resolve("node_modules", "pixi.js", "lib", "accessibility"),
                        path.resolve("node_modules", "pixi.js", "lib", "utils"),
                        path.resolve("node_modules", "pixi.js", "lib", "events"),
                        path.resolve("node_modules", "pixi.js", "lib", "maths"),
                        path.resolve("node_modules", "pixi.js", "lib", "color"),
                        path.resolve("node_modules", "pixi.js"),
                        path.resolve("node_modules", "pixi-filters"),
                        path.resolve("node_modules", "pixi-svg-loader"),
                        // path.resolve("node_modules", "core-js", "modules"),
                        // path.resolve("node_modules")
                    ],
                      exclude: {
                        and: [/node_modules/],
                        not: [
                            /@pixi/,
                            /pixi.js/,
                            /pixi-filters/,
                            /pixi-svg-loader/
                        ]},
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: { "safari": "10", "chrome": "100" },
                                    // debug: true,
                                    useBuiltIns: "usage",
                                    corejs: "2.6.12"
                                }]
                            ],
                            plugins: ['@babel/plugin-transform-typescript', "@babel/plugin-transform-optional-chaining", "@babel/plugin-transform-nullish-coalescing-operator"]
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.js'
            ],
            modules: [
                'node_modules'
            ]
        },

        plugins: [
            // Copy our static assets to the final build
            new CopyPlugin({
                patterns: [{ from: 'src/assets/' }],
            }),

            // Make an index.html from the template
            new HtmlWebpackPlugin({
                template: 'src/index.ejs',
                hash: true,
                minify: true
            }),

            new Dotenv({systemvars: true})
        ]
    });
}