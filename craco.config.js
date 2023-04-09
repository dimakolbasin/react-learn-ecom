const path = require('path')

console.error('qwerty', path.resolve(__dirname, 'src/theme'));

module.exports = {
  webpack: {
    alias: {
      theme: path.resolve(__dirname, 'src')
    },
    devServer: {
      overlay: false,
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                eslintPath: require.resolve('eslint'),
                ignore: true
              },
              loader: require.resolve('eslint-loader')
            }
          ],
          include: path.resolve(__dirname, 'src')
        }
      ]
    }
  }
};