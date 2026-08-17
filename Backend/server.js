const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`server running on port ${port}`);
});