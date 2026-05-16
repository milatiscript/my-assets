const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    // ترافیک به سمت سرور شما هدایت می‌شود
    target: 'http://103.83.86.162:20113', 
    changeOrigin: true,
    ws: true, // فعال‌سازی وب‌ساکت برای تونل V2Ray
    pathRewrite: {
      '^/api/proxy': '', // حذف مسیر /api/proxy از درخواست نهایی
    },
    onProxyReq: (proxyReq, req, res) => {
      // اضافه کردن هدر برای پایداری بیشتر
      proxyReq.setHeader('Host', '103.83.86.162');
    },
    onError: (err, req, res) => {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Proxy Error: ' + err.message);
    }
  });

  return proxy(req, res);
};
