const http = require('http');

const server = http.createServer()
server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end('Okay !')
})
server.listen(process.env.PORT || 3000);
const express = require('express');

const app = express();


rtfy
module.exports = app;