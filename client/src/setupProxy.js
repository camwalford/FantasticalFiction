const { createProxyMiddleware } = require('http-proxy-middleware');

//CREATES A PROXY FOR HTTP REQUEST TO THE BACKEND
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};