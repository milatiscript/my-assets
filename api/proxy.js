const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'http://103.83.86.162:10985', 
    changeOrigin: true,
    ws: true,
    onProxyReq: (proxyReq, req, res) => {
      // این هدر باعث می‌شود پنل فکر کند شما با دامنه قدیمی وارد شده‌اید
      proxyReq.setHeader('Host', 'cdn.milatimarket.shop');
    },
    onProxyRes: (proxyRes, req, res) => {
      // رفع محدودیت‌های احتمالی مرورگر
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    onError: (err, req, res) => {
      res.status(500).send('خطا در اتصال به سرور اصلی: ' + err.message);
    }
  });

  return proxy(req, res);
};
