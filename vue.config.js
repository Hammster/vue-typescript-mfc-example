const path = require('path')

module.exports = {
    // TODO: Transform these configs into the webpack-chain format
    pages: {
        index: {
            entry: "./src/main.ts",
            template: "./src/templates/index.pug"
        }
    },
    configureWebpack: {
        // Enable use sourcemaps and breakpoints
        devtool: 'source-map',
        resolve: {
            alias: {
                //Example usage
                //import var from "@components/vars";
                '@styles': path.resolve(__dirname, './src/styles'),
                '@components': path.resolve(__dirname, './src/components'),
                '@templates': path.resolve(__dirname, './src/templates'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@': path.resolve(__dirname, './src')
            }
        }
    },
    chainWebpack: webpackConfig => {
        // Remove default configuration for pug
        webpackConfig.module.rules.delete('pug')

        webpackConfig.module
            .rule('pug')
                .test(/\.pug$/)
                // Single file components
                .oneOf('vue-loader')
                    .resourceQuery(/^\?vue/)
                    .use('pug-plain')
                        .loader('pug-plain-loader')
                        .end()
                    .end()
                // Multi file components (vue-template-loader via decoration)
                .oneOf('component-pug-files')
                    .include
                        .add(path.resolve(__dirname, './src/components'))
                        .end()
                    .use('vue-template')
                        .loader('vue-template-loader')
                        .options({
                            scoped: true,
                            transformAssetUrls: {
                                img: 'src'
                            }
                        })
                        .end()
                    .use('pug-plain')
                        .loader('pug-plain-loader')
                        .end()
                    .end()
                // General import
                .oneOf('raw-pug-files')
                    .exclude
                        .add(path.resolve(__dirname, './src/components'))
                        .end()
                    .use('pug-raw')
                        .loader('raw-loader')
                        .end()
                    .use('pug-plain')
                        .loader('pug-plain-loader')
                        .end()
                    .end()
                .end()
            .rule('scss')
                .oneOf('normal')
                    .exclude
                        .add(path.resolve(__dirname, './src/components'))
                        .end()
                    .end()
                .oneOf('normal-mfc')
                    .include
                        .add(path.resolve(__dirname, './src/components'))
                        .end()
                    .enforce('post')
                    .use('vue-style-loader')
                        .loader('vue-style-loader')
                        .options({sourceMap: false, shadowMode: false})
                        .end()
                    .use('css-loader')
                        .loader('css-loader')
                        .options({sourceMap: false})
                        .end()
                    .use('postcss-loader')
                        .loader('postcss-loader')
                        .options({sourceMap: false})
                        .end()
                    .use('sass-loader')
                        .loader('sass-loader')
                        .options({sourceMap: false})
                        .end()
                    .end()
    }
};