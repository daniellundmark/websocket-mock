const WebSocket = require('ws');

// A simple echo websocket client as a function
// Taken from https://github.com/websockets/ws

function echo() {

    const ws = new WebSocket('wss://echo.websocket.org/', {
        origin: 'https://websocket.org'
    });

    ws.on('open', function open() {
        console.log('connected');
        ws.send(Date.now());
    });

    ws.on('close', function close() {
        console.log('disconnected');
    });

    ws.on('message', function incoming(data, flags) {
        console.log(`Roundtrip time: ${Date.now() - data} ms`, flags);

        setTimeout(function timeout() {
           ws.send(Date.now());
        }, 500);
    });

}

module.exports = echo;
