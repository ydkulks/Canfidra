const express = require('express');
import { createServer } from 'node:http';
import { Server } from 'socket.io';
const os = require('os')

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    // NOTE: Change URL for Production
    origin: "http://localhost:3000"
  }
})

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('create or join', (room) => {
    console.log("Created/joined ", room)
    var clientsInRoom = io.sockets.adapter.rooms.get(room);
    var numClients = clientsInRoom ? clientsInRoom.size : 0;

    if (numClients === 0) {
      socket.join(room);

      socket.emit('created', room, socket.id, numClients);

    } else if (numClients <= 10) {
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id, numClients);
      io.sockets.in(room).emit('ready');
    } else { // max clients
      socket.emit('full', room);
    }

  });

  socket.on('ipaddr', () => {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details: any) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  // Chat
  socket.on('chat message', (room, msg) => {
    // socket.broadcast.to(room).emit(msg); //Does not work
    // io.to(room).emit('chat message', msg); //Does not work
    io.emit('chat message', msg); // Sends to sender only
  })

})

server.listen(4000, () => {
  // NOTE: Change URL for Production
  console.log('server running at http://localhost:4000');
});
