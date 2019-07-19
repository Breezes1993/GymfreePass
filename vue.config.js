const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  productionSourceMap: true,
  outputDir: 'GymFreePass',
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://ty.xmsoft.com', // 设置你调用的接口域名和端口号
        // target: 'http://10.8.145.160:80/',
        // target: 'http://111.206.219.235:9890',// 永明部署235
        changeOrigin: true, // 跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};
