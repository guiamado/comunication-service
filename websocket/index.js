const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const socketioJWT = require('socketio-jwt');
require('dotenv/config');

const clientes = [];
const salasDeSistemas = [];
const serverPort = 8001;

const self = this;

export const isSistemaAutorizado = (sistemasAutorizados, sala) => {
    const indice = sistemasAutorizados.findIndex(sistemaAutorizado => sistemaAutorizado.sistema_id === sala);
    if (indice === -1) {
        throw new Error('** Sistema solicitado não faz parte do grupo de permissões do usuário. **');
    }
};

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


io.on('connection', (socketClient) => {
    const decodedToken = socketClient.decoded_token;
    const dadosUsuario = decodedToken.user;
    const identificadorUsuario = dadosUsuario.user_id;
    const sistemasAutorizados = dadosUsuario.sistemas;

    console.log(`Usuário [ ${dadosUsuario.name} ] conectado.`);

    clientes.push(identificadorUsuario);

    io.emit('clientConnectedUsers', clientes.length);

    socketClient.on('serverEntrarEmSala', (dados) => {
        try {
            const { sala } = dados;
            self.isSistemaAutorizado(sistemasAutorizados, sala);

            const salaPesquisada = salasDeSistemas.find(valor => valor === sala);
            if (typeof salaPesquisada === 'undefined') {
                console.log(`Criando sala ${sala}`);
                salasDeSistemas.push(sala);
                socketClient.join(sala);
            }

            const novosDados = dados;
            novosDados.usuario = dadosUsuario;
            io.to(sala).emit('clientEntrarEmSala', novosDados);
        } catch (Exception) {
            console.log(Exception);
        }
    });

    socketClient.on('serverSairDeSala', (dados) => {
        try {
            const { sala } = dados;
            self.isSistemaAutorizado(sistemasAutorizados, sala);

            socketClient.leave(sala);
            socketClient.to(sala).emit('clientSairDeSala', dados);
        } catch (Exception) {
            console.log(Exception);
        }
    });

    socketClient.on('serverMensagemSala', (dados) => {
        try {
            const { sala } = dados;
            self.isSistemaAutorizado(sistemasAutorizados, sala);

            const novosDados = dados;
            novosDados.usuario = dadosUsuario;
            io.to(sala).emit('clientMensagemSala', novosDados);
        } catch (Exception) {
            console.log(Exception);
        }
    });

    socketClient.on('serverMensagem', dados => socketClient.to(dados.sala).emit('clientMensagem', dados));

    socketClient.on('serverMensagemGlobal', dados => salasDeSistemas
        .forEach(value => socketClient.to(value).emit('clientMensagemGlobal', dados)));

    socketClient.on('disconnect', () => {
        const indice = clientes.findIndex(cliente => cliente === identificadorUsuario);
        clientes.splice(indice, 1);
        console.log('user disconnected');
        io.emit('connectedUsers', clientes.length);
    });

    socketClient.on('error', data => console.log(data));
});

io.on('error', data => console.log(data));
