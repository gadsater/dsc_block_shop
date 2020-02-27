var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    let id = socket.id
    console.log(id, 'connected');
    socket.broadcast.emit('peerConnect', id);
    socket.on('disconnect', () => {
        console.log(id, 'disconnected');
        socket.broadcast.emit('peerDisconnect', id);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});