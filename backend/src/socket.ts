const express = require('express');
import { createServer } from 'node:http';
// const { join } = require('node:path');
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000"
  }
})


app.get('/', (req: Request, res: Response) => {
  // res.send('<h1>Hello world</h1>');
  res.text()
  // res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {

    console.log('user disconnected');
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })
})

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});
