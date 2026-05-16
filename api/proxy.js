const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'http://103.83.86.162:10985',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/api/proxy': '', // این بخش /api/proxy را حذف می‌کند تا بقیه آدرس به سرور برسد
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Host', 'cdn.milatimarket.shop');
    },
    onError: (err, req, res) => {
      res.status(500).send('Proxy Error: ' + err.message);
    }
  });

  return proxy(req, res);
};
