const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const http = require('http');
const app = require('./app');

const { initializeSocket } = require('./socket');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});