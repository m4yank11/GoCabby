// const http = require('http')
// const app = require('./app')
// // Import and call initializeSocket with the created server
// const { initializeSocket } = require('./socket')
// const port = process.env.PORT || 4000

// const server = http.createServer(app)

// initializeSocket(server);

// server.listen(port, () => {
//     console.log(`Server is running on Port: ${port}`)
// })
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 4000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});