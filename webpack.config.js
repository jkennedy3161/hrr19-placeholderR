// var path = require('path');
// var config = {
//   context: path.join(__dirname, 'client'),
//   entry: [
//     './main.js',
//   ],
//   output: {
//     path: path.join(__dirname, '/client/dist'),
//     filename: 'bundle.js',
//   },
//   module: {
//     loaders: [
//       {include: /\.json$/, loaders: ["json-loader"]},
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loaders: ['babel']
//       }
//     ],
//     resolve: {
//       extensions: ['', '.json', '.jsx', '.js']
//     }
//   }
// };
// module.exports = config;