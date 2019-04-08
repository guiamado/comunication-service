import SocketIO from 'socket.io-client';

const socketServer = `http://${process.env.VUE_APP_WEBSOCKET_HOST}:${process.env.VUE_APP_WEBSOCKET_PORT}`;
const token = localStorage.getItem('token');
const clientSocketOptions = {
    autoConnect: false,
    query: { token },
};

export default SocketIO(socketServer, clientSocketOptions);
