const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { override, fixBabelImports, overrideDevServer, useBabelRc, addWebpackPlugin } = require('customize-cra')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const devServerConfig = () => config => {
  return {
    ...config,
    port: 3000,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        ws: false,
        secure: false,
      },
    },
  }
}

const plugins = [addWebpackPlugin(new AntdDayjsWebpackPlugin())]
if (process.env.NODE_ENV === 'production') {
  plugins.push(addWebpackPlugin(new BundleAnalyzerPlugin()))
}

module.exports = {
  webpack: override(
    useBabelRc(),
    ...plugins,
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
  ),
  devServer: overrideDevServer(devServerConfig()),
}
