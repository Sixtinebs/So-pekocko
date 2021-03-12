const http = require('http');
const app = require('./app');

//return valid port: string  or number
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >=0 ) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//find errors and handle them
const errorHandler = error => {
    //property is a string describing the syscall that failed
    if (error.syscall !== 'listen') {
        throw error;
      }
      const address = server.address();
      const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges.');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use.');
          process.exit(1);
          break;
        default:
          throw error;
      }
    };


const server = http.createServer(app)
server.on('error', errorHandler);
/*
server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
})
*/
server.on ('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    console.log('listening on' + bind );
});


server.listen(port);
