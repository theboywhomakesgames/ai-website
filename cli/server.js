const express = require('express');
const favicon = require('express-favicon');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use("/register", createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true
}));
app.use("/login", createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true
}));
app.use("/api", createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true
}));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);