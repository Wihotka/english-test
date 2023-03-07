const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ip = require('ip').address();

const c = {
    v: process.env.npm_package_version,
    analyzeBundles: false,
    benchmark: false
};

/**
 * @link https://link.medium.com/X9iilMtH2X
 * @return {webpack.DefinePlugin}
 */
const createEnvPlugin = env => {
    const envKeys = (() => {
        if (!env)
            return {};

        return Object.keys(env).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(env[next]);

            return prev;
        }, {});
    })();

    return new webpack.DefinePlugin(envKeys);
};

/**
 *
 * @param {boolean} isProd
 * @returns {[]}
 */
const createPlugins = (isProd) => {
    const def = [
        createEnvPlugin(process.env),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'assets/',
                    to: 'assets/',
                    toType: 'dir',
                    noErrorOnMissing: true,
                }
                // { from: "other", to: "public" },
            ],
        }),
        new HtmlWebpackPlugin({
            title: 'English Test',
            template: path.resolve(__dirname, './src/template.html'),
            filename: isProd ? 'index.php' : 'index.html',
            base: isProd ? false : '/'
        }),
    ];

    if (!isProd)
        def.push(
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true
                    }
                }
            }),
            // new ReactRefreshPlugin(),
            // new webpack.HotModuleReplacementPlugin()
        );

    if (isProd)
        def.push(
            new SentryWebpackPlugin({
                // sentry-cli configuration
                authToken: '569d8c41302a4cfa9938293afac80f5d183e57f5e0ee4fd29c9d52071a809fbd', // цей токен прив"язаний до користувача, не до проекту!
                org: "ruslanmk",
                project: "student-interface",
                release: process.env.npm_package_version,

                // webpack specific configuration
                include: ".",
                ignore: ["node_modules", "webpack.config.js"],
            }),

            new CopyPlugin({
                patterns: [
                    { from: "public" },
                    // {
                    //     from: '../assets/',
                    //     to: 'assets/',
                    //     toType: 'dir'
                    // }
                    // { from: "other", to: "public" },
                ],
            }),
            new MiniCssExtractPlugin({
                filename: 'styles.min.css?v=' + c.v
            }),
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
            }),
        );

    if (c.analyzeBundles)
        def.push(new BundleAnalyzerPlugin());

    return def;
};

/**
 *
 * @param {boolean} isProd
 * @returns {[]}
 */
const tsxLoaders = (isProd) => {
    const def = [];

    if (!isProd) {
        def.push(
            {
                loader: 'thread-loader',
                options: {
                    // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                    workers: require('os').cpus().length - 1,
                    workerParallelJobs: 50,
                    poolRespawn: false,
                    poolTimeout: Infinity // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
                },
            }
        );
    }

    def.push(
        {
            loader: 'ts-loader',
            options: {
                transpileOnly: !isProd,
                happyPackMode: !isProd, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                ...(!isProd && {
                    getCustomTransformers: () => ({
                        before: [ReactRefreshTypeScript()],
                    })
                })
            }
        },
        {loader: 'eslint-loader'}
        );

    return def;
};

/**
 * @param {boolean} isProd
 * @returns {string}
 */
const localIdentClassesName = (isProd) => isProd ? '[path][name][local]' : '[local]_[hash:base64:10]';

/**
 * @param {boolean} isProd
 * @returns {[{loader: string}]|[*]}
 */
const getScssLoaders = (isProd) => {
    const def = !isProd
        ? [{loader: 'style-loader'}]
        : [MiniCssExtractPlugin.loader];

    def.push({
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: localIdentClassesName(isProd)
            }
        }
    });

    if (isProd) {
        def.push({loader: 'postcss-loader'});
    }

    def.push({
        loader: 'sass-loader'
    });

    return def;
};

/**
 * @param {boolean} isProd
 * @returns {[{loader: string}]|[*]}
 */
const getCssLoaders = (isProd) => {
    const def = !isProd
        ? [{loader: 'style-loader'}]
        : [MiniCssExtractPlugin.loader];

    def.push({
        loader: 'css-loader'
    });

    if (isProd) {
        def.push({loader: 'postcss-loader'});
    }

    return def;
};

module.exports = (env, options) => {
    const isProd = options.mode === 'production';

    const config = {
        optimization: {
            minimize: isProd,
            minimizer: [
                new TerserPlugin({
                    // sourceMap: true,
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    },
                    // extractComments: false
                })
            ]
        },
        entry: !isProd
            ? [path.resolve(__dirname, './src/index.tsx')]
            : ['core-js/es', path.resolve(__dirname, './src/index.tsx')],
        devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
            plugins: [
                new TsconfigPathsPlugin({
                    baseUrl: 'src',
                    configFile: 'tsconfig.json'
                })
            ],
            alias: {
                '_assets': path.resolve(__dirname, 'assets'),
                '@mixins': path.resolve(__dirname, 'src/components/app/styles/mixins.scss')
            }
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].bundle.js?v=' + c.v,
            // sourceMapFilename: '[name].js.map?v=' + c.v,
            chunkFilename: '[name].js?v=' + c.v
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts)?$/,
                    use: tsxLoaders(isProd),
                    exclude: [/node_modules/]
                },
                {
                    test: /\.(scss)$/,
                    use: getScssLoaders(isProd),
                    exclude: /node_modules/
                },
                {
                    test: /\.(css)$/,
                    use: getCssLoaders(isProd)
                    // exclude: /node_modules/,
                },
                {
                    test: /\.(gif|eot|svg|png|jpg|jpeg|ttf|woff|woff2|otf|ogg|aac|mp3|mp4|wav|ico|mov)$/,
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        toType: 'dir',
                        name: '[path][name].[ext]'
                    }
                }
            ]
        },
        plugins: createPlugins(isProd),
        target: isProd ? 'browserslist' : 'web',
        devServer: {
            historyApiFallback: true,
            // contentBase: path.resolve(__dirname, './dist'),
            compress: isProd,
            host: 'localhost',
            https: true,
            hot: true,
            port: 1100,
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            }
        },
        stats: {
            assets: false
        }
    };

    return c.benchmark
        ? new SpeedMeasurePlugin().wrap(config)
        : config;
};
