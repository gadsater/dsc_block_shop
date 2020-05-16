const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let uuid
let peers = []

io.on('connection', socket => {

    socket.on('initUser', data => {
        uuid = data['uuid']
        console.log(uuid, 'connected');

        // update list of peers
        peers.push(uuid)
        socket.broadcast.emit('updatePeers', peers);
    })

    socket.broadcast.emit('peerConnect', uuid);

    socket.on('disconnect', () => {
        console.log(uuid, 'disconnected');
        socket.broadcast.emit('peerDisconnect', uuid);

        // update list of peers
        peers = peers.filter(x => x != uuid)
        socket.broadcast.emit('updatePeers', peers);
    });

    socket.on('sendMessage', data => {
        console.log(data.sender, 'says:', data.data);
        socket.broadcast.emit('incomingMsg', data)
    });
});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});