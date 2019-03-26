const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('dotenv/config');

const jsonwebtoken = require('jsonwebtoken');

const clients = [];
const canaisDeSistemas = [];

const serverPort = 8001;
app.use(express.urlencoded({
    extended: true,
}));

server.listen(serverPort, () => {
    console.log(`Servidor Rodando na Porta ${serverPort}. \n Usuários ativos: ${clients.length}`);
});

app.get('/', (req, res) => {
    res.send(`Servidor Rodando na Porta ${serverPort}  <br /> Usuários ativos: ${clients.length}`);
});

io.on('connection', (socket) => {
    console.log('an user connected');

    clients.push({ clientId: socket.client.id });

    io.emit('connectedUsers', clients.length);

    socket.on('serverEntrarEmCanal', (dados) => {
        try {
            const canal = dados.sistema_id;
            const { token } = dados;
            const tokenDecodificada = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            const { sistemas } = tokenDecodificada;

            const indice = sistemas.findIndex(sistema => sistema.sistema_id === canal);
            if (indice === -1) {
                throw new Error('Sistema solicitado não faz parte do grupo de permissões do usuário.');
            }

            const canalPesquisado = canaisDeSistemas.find(valor => valor === canal);
            if (canalPesquisado !== canal) {
                canaisDeSistemas.push(canal);
                socket.join(canal);
                socket.to(canal).emit('clientEntrarCanal', dados);
            }
        } catch (Exception) {
            console.log(Exception);
        }
    });

    socket.on('serverMensagem', (dados) => {
        const canal = dados.sistema_id;
        socket.to(canal).emit('clientMensagem', dados);
    });

    socket.on('disconnect', () => {
        const index = clients.findIndex(client => client.clientId === socket.client.id);
        clients.splice(index, 1);
        console.log('user disconnected');
        io.emit('connectedUsers', clients.length);
    });

    socket.on('serverMensagemGlobal', (dados) => {
        console.log(`[${dados.clientId}]: ${dados.message}`);

        canaisDeSistemas.forEach((value) => {
            socket.to(value).emit('clientMensagemGlobal', dados);
        });
    });
});

