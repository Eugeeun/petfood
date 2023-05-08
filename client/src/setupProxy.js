const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // api로 시작하는 주소가 오면
    createProxyMiddleware({
      target: 'http://localhost:5000', // 이 주소를 목적지로 함!
      changeOrigin: true,
    })
  );
};
