const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  let target = '';
  
  // این بخش آدرس سایتی که می‌خواهید باز شود را مشخص می‌کند
  // به عنوان مثال اگر می‌خواهید از طریق این پل به گوگل بروید:
  if (req.url.startsWith('/google')) {
    target = 'https://www.google.com';
  } else {
    target = 'https://api.openai.com'; // یا هر سایت دیگری
  }

  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/api/proxy': '', 
    },
  });

  return proxy(req, res);
};
