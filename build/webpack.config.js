const path = require('path');

module.exports = {
  entry: {
    a: {
      import: path.resolve(__dirname, './test/a.js'),
      filename: 'a.js',
    },
    b: {
      import: path.resolve(__dirname, './test/b.js'),
      filename: 'b.js',
    },
  },
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, './dist'),
  // },
  mode: 'production',
};
