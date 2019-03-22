const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
server = http.createServer(app);
const io = socketio(server);

const clients = [];
const serverPort = 8001;
app.use(
    express.urlencoded({
        extended: true
    })
);

server.listen(serverPort, function () {
    console.log(`Servidor Rodando na Porta ${serverPort}. \n Usuários ativos: ${clients.length}`);
});

app.get("/", function (req, res) {
    res.send(`Servidor Rodando na Porta ${serverPort}  <br /> Usuários ativos: ${clients.length}`);
});

io.on("connection", function (socket) {
    
    console.log('an user connected');
    
    clients.push({clientId: socket.client.id})
    
    io.emit('connectedUsers', clients.length);
    io.emit('clientConnected', {clientId: socket.client.id});
    
    socket.on('disconnect', () => {
        const index = clients.findIndex(client => client.clientId === socket.client.id);
        clients.splice(index, 1);
        console.log('user disconnected');
        io.emit('connectedUsers', clients.length);
        io.emit('clientDisconnected', {clientId: socket.client.id});
    });
    
    socket.on('chatMessage', (data) => {
        console.log(`[${data.clientId}]: ` + data.message);

        io.emit('generalChat', data);
    });
    
    
});


