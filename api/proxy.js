const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'http://103.83.86.162:10985',
    changeOrigin: true,
    ws: true,
    // این دو خط باعث می‌شود تغییر مسیرهای پنل (Redirects) خراب نشوند
    autoRewrite: true, 
    protocolRewrite: 'https',
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Host', 'cdn.milatimarket.shop');
    },
    onProxyRes: (proxyRes, req, res) => {
      // حذف هدرهایی که ممکن است باعث تداخل شوند
      delete proxyRes.headers['content-security-policy'];
    },
    onError: (err, req, res) => {
      res.status(500).send('Proxy Error: ' + err.message);
    }
  });

  return proxy(req, res);
};
