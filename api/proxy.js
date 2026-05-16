const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    // آدرس آی‌پی و پورت پنل شما
    target: 'http://103.83.86.162:10985', 
    changeOrigin: true,
    ws: true,
    onProxyReq: (proxyReq, req, res) => {
      // تنظیم هدر Host که برای پنل شما حیاتی است
      proxyReq.setHeader('Host', 'cdn.milatimarket.shop');
    },
    pathRewrite: {
      '^/api/proxy': '', // حذف /api/proxy برای فرستادن بقیه آدرس به سرور
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    onError: (err, req, res) => {
      res.end('Error connecting to Server: ' + err.message);
    }
  });

  return proxy(req, res);
};
