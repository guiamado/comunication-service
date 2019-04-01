import io from 'socket.io-client';
const socketServer = `http://${process.env.VUE_APP_WEBSOCKET_HOST}:${process.env.VUE_APP_WEBSOCKET_PORT}`;
export default io(socketServer);
