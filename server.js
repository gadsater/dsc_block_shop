let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let bchain =  require('./blockchain.js');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 
});

app.get('/two', (req, res) => {
    res.sendFile(__dirname + '/clone.html');
});

let uuid, user
io.on('connection', socket => {
    
    socket.on('initUser', data => {
        uuid = data['uuid']
        user = bchain.makeUser(socket.id, uuid)
        console.log('user:', user)
        console.log(uuid, 'connected');
    })

    socket.broadcast.emit('peerConnect', uuid);

    socket.on('disconnect', () => {
        console.log(uuid, 'disconnected');
        socket.broadcast.emit('peerDisconnect', uuid);
    });

    socket.on('makeTransaction', data => {
        console.log('Transaction:', data);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});