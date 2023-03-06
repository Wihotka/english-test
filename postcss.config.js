module.exports = {
    plugins: [
        require('postcss-preset-env')({
            browsers: 'last 20 versions',
        }),
    ],
};