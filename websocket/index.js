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
    const tokenDecodificada = socketClient.decoded_token;
    const dadosUsuario = tokenDecodificada.user;
    const identificadorUsuario = dadosUsuario.user_id;
    const sistemasAutorizados = dadosUsuario.sistemas;

    const isSistemaAutorizado = (sala) => {
        const indice = sistemasAutorizados.findIndex(sistemaAutorizado => sistemaAutorizado.sistema_id === sala);
        if (indice === -1) {
            throw new Error('** Sistema solicitado não faz parte do grupo de permissões do usuário. **');
        }
    };

    const tratarEntradaEmSala = (sala, prefixo) => {
        let indiceSalaPesquisada = salasDeSistemas.findIndex(valor => valor.sala === sala);
        if (indiceSalaPesquisada === -1) {
            console.log(`Criando sala ${sala}`);
            salasDeSistemas.push({
                sala,
                membros: [],
            });
            socketClient.join(`${prefixo}${sala}`);
        }

        indiceSalaPesquisada = salasDeSistemas.findIndex(valor => valor.sala === sala);

        const indiceSalaUsuarioPesquisada = salasDeSistemas[indiceSalaPesquisada]
            .membros
            .findIndex(membro => membro.email === dadosUsuario.email);
        if (indiceSalaUsuarioPesquisada === -1) {
            salasDeSistemas[indiceSalaPesquisada].membros.push({
                nome: dadosUsuario.name,
                email: dadosUsuario.email,
            });
            socketClient.join(`${prefixo}${sala}`);
        }

        io.to(`${prefixo}${sala}`).emit('clientMembrosSala', salasDeSistemas[indiceSalaPesquisada].membros);
        // console.log('salas:');
        // console.log(Object.keys(io.sockets.adapter.rooms));
    };

    console.log(`Usuário [ ${dadosUsuario.name} ] conectado.`);

    const indiceClientePesquisado = clientes.findIndex(cliente => cliente === identificadorUsuario);
    if (indiceClientePesquisado === -1) {
        clientes.push(identificadorUsuario);
    }

    io.emit('clientConnectedUsers', clientes.length);

    socketClient.on('serverEntrarEmSala', (dados) => {
        try {
            const { sala } = dados;
            isSistemaAutorizado(sala);
            tratarEntradaEmSala(sala, 'sala_');

            const novosDados = dados;
            novosDados.usuario = dadosUsuario;
            io.to(`sala_${sala}`).emit('clientEntrarEmSala', novosDados);
        } catch (Exception) {
            console.log(Exception);
        }
    });

    socketClient.on('serverSairDeSala', (dados) => {
        try {
            const { sala } = dados;
            isSistemaAutorizado(sala);

            socketClient.leave(sala);
            socketClient.to(`sala_${sala}`).emit('clientSairDeSala', dados);

            const indiceSalaPesquisada = salasDeSistemas.findIndex(valor => valor.sala === sala);
            const indiceSalaUsuarioPesquisada = salasDeSistemas[indiceSalaPesquisada]
                .membros
                .findIndex(membro => membro.email === dadosUsuario.email);
            if (indiceSalaUsuarioPesquisada === -1) {
                salasDeSistemas[indiceSalaPesquisada].membros.slice(indiceSalaUsuarioPesquisada, 1);
            }
        } catch (Exception) {
            console.log(Exception);
        }
    });

    socketClient.on('serverMensagemSala', (dados) => {
        try {
            const { sala } = dados;
            isSistemaAutorizado(sala);

            const novosDados = dados;
            novosDados.usuario = dadosUsuario;

            io.to(`sala_${sala}`).emit('clientMensagemSala', novosDados);
        } catch (Exception) {
            console.log(Exception);
        }
    });

    socketClient.on('serverNotificacaoSistema', (dados) => {
        const { sala } = dados;
        tratarEntradaEmSala(sala, 'notificacoes_sistema_');
        io.to(`notificacoes_sistema_${sala}`).emit('clientNotificacaoSistema', dados);
    });

    // socketClient.on('serverMensagem', dados => socketClient.to(dados.sala).emit('clientMensagem', dados));
    //
    // socketClient.on('serverMensagemGlobal', dados => salasDeSistemas
    //     .forEach(value => socketClient.to(value).emit('clientMensagemGlobal', dados)));

    socketClient.on('disconnect', () => {
        const indice = clientes.findIndex(cliente => cliente === identificadorUsuario);
        clientes.splice(indice, 1);
        io.emit('connectedUsers', clientes.length);
    });

    socketClient.on('error', data => console.log(data));
});

io.on('error', data => console.log(data));
