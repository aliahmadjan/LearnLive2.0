const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ target: 'https://marvelous-baklava-4f7cee.netlify.app', changeOrigin: true }));
};
