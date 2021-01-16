const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.set('port', process.env.PORT || 3000);


require('./sockets')(io);


app.use(express.static(path.join(__dirname, '../public')));


server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});