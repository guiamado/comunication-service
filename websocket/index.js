const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const jsonwebtoken = require('jsonwebtoken');
const socketioJWT = require('socketio-jwt');
require('dotenv/config');

const clientes = [];
const canaisDeSistemas = [];
const serverPort = 8001;

app.use(express.urlencoded({
    extended: true,
}));

server.listen(serverPort, () => {
    console.log(`Servidor Rodando na Porta ${serverPort}. \n Usuários ativos: ${clientes.length}`);
});

app.get('/', (req, res) => {
    res.send(`Servidor Rodando na Porta ${serverPort}  <br /> Usuários ativos: ${clientes.length}`);
});

// middleware - socketioJWT
io.use(socketioJWT.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true,
}));

io.on('connection', (socket) => {
    const decodedToken = socket.decoded_token;
    const dadosUsuario = decodedToken.user;
    const identificadorUsuario = dadosUsuario.user_id;
    const sistemasAutorizados = dadosUsuario.sistemas;
    // const isAdmin = dadosUsuario.is_admin;

    console.log(`Usuário [ ${dadosUsuario.name} ] conectado.`);

    clientes.push(identificadorUsuario);

    io.emit('clientConnectedUsers', clientes.length);

    socket.on('serverEntrarEmCanal', (dados) => {
        try {
            const canal = dados.sistema_id;
            const indice = sistemasAutorizados.findIndex(sistema => sistema.sistema_id === canal);
            if (indice === -1) {
                throw new Error('Sistema solicitado não faz parte do grupo de permissões do usuário.');
            }

            const canalPesquisado = canaisDeSistemas.find(valor => valor === canal);
            if (canalPesquisado !== canal) {
                canaisDeSistemas.push(canal);
                socket.join(canal);
            }
            socket.to(canal).emit('clientEntrarCanal', dados);
        } catch (Exception) {
            console.log(Exception);
        }
    });

    socket.on('serverMensagem', dados => socket.to(dados.sistema_id).emit('clientMensagem', dados));

    socket.on('serverMensagemGlobal', dados => canaisDeSistemas
        .forEach(value => socket.to(value).emit('clientMensagemGlobal', dados)));

    socket.on('disconnect', () => {
        const index = clientes.findIndex(cliente => cliente === identificadorUsuario);
        clientes.splice(index, 1);
        console.log('user disconnected');
        io.emit('connectedUsers', clientes.length);
    });

    socket.on('error', data => console.log(data));
});

io.on('error', data => console.log(data));
