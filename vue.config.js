// const webpack = require("webpack");
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  lintOnSave:false,//这里禁止使用eslint-loader
}

