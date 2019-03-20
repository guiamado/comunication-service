const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
server = http.createServer(app);
const io = socketio(server);
const serverPort = 8001;


const clients = [];
app.use(
    express.urlencoded({
        extended: true
    })
);

server.listen(serverPort, function (data) {
    console.log('Listen action')
    console.log(data)
    console.log(`Servidor Rodando na Porta ${serverPort}`);
});


app.get("/", function (req, res) {
    res.send(`Servidor Rodando na Porta ${serverPort} <br /> Clients Ativos: ${clients.length}`);
});

app.post("/notifications", function (request, response) {
    var params = request.body;
    var clients = io.sockets.clients().sockets;
    if (clients.length > 0) {
        Object.keys(clients).forEach((indice) => {
            if (indice != params.id) clients[indice].emit("like", params);
        });
    }
    response.send();
});


io.on("connection", function (client) {
    console.log(client)
    // Adicionado clientes
    client.emit("welcome", {
        id: client.id
    });

    client.emit('online_users', clients.length);
});
