"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const node_http_1 = require("node:http");
// const { join } = require('node:path');
const socket_io_1 = require("socket.io");
const app = express();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.text();
    // res.sendFile(join(__dirname, 'index.html'));
});
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});
server.listen(4000, () => {
    console.log('server running at http://localhost:4000');
});
