const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@/stitches': path.resolve(__dirname, 'src/styles/main.js')
    }
  }
};
