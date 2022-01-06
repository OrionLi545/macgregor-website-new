function getStyleUse(bundleFilename) {
    return [
        {
            loader: 'file-loader',
            options: {
                name: bundleFilename,
            },
        },
        { loader: 'extract-loader' },
        { loader: 'css-loader' },
        {
            loader: 'sass-loader',
            options: {
                implementation: require('sass'),
                sassOptions: {
                    includePaths: ['./node_modules'],
                    fiber: require('fibers'),
                }
            }
        },
    ];
}

module.exports = [
    {
        mode: 'production',
        entry: './main.js',
        output: {
            filename: 'bundle-main.js',
        },
        devServer: {
            static: '.',
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                },
            ]
        },
    },
    {
        mode: 'production',
        entry: './main.scss',
        output: {
            // This is necessary for webpack to compile, but we never reference this js file.
            filename: 'style-bundle.js',
        },
        module: {
            rules: [{
                test: /main.scss$/,
                use: getStyleUse('bundle-main.css')
            }]
        },
    }
];