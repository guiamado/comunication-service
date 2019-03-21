const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
server = http.createServer(app);
const io = socketio(server);
const serverPort = 8001;


const clients = [];
const serverPort = 8001;
app.use(
    express.urlencoded({
        extended: true
    })
);

server.listen(8001, function () {
    console.log(`Servidor Rodando na Porta ${serverPort}. <br /> Usuários ativos: ${clients.length}`);
});

app.get("/", function (req, res) {
    res.send(`Servidor Rodando na Porta ${serverPort}`);
});

// app.post("/like", function (req, res) {
//     var params = req.body;
//     var clients = io.sockets.clients().sockets;
//     if (clients.length > 0) {
//         Object.keys(clients).forEach((indice) => {
//             if (indice != params.id) clients[indice].emit("like", params);
//         });
//     }
//     res.send();
// });

io.on("connection", function (socket) {

    socket.emit('request', /* */); // emit an event to the socket
    io.emit('broadcast', /* */); // emit an event to all connected sockets
    socket.on('reply', function(){ /* */ }); // listen to the event

    // client.emit("welcome", {
    //     id: client.id
    // });

});
