const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig(
  {
    publicPath: './',
    transpileDependencies: true,
    devServer: {
      port: 9527,     // 端口
    },
    lintOnSave: false   // 取消 eslint 验证
  }
)
