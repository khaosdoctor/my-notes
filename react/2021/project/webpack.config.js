const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de sáida
    filename: 'bundle.js' // nome do arquivo
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'] // extensões que o webpack vai procurar
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: { // configurações do webpack
    rules: [ // regras para cada extensão de arquivo
      {
        test: /\.(js|jsx)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: 'babel-loader' // usar o loader, que é a integração do babel com o webpack
      },
      {
        test: /\.(scss|sass)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: ['style-loader', 'css-loader', 'sass-loader'] // usar o loader, que é a integração do babel com o webpack
      }
    ]
  }
}
