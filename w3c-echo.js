const Wc3WebSocket = require('websocket').w3cwebsocket;

// A simple echo websocket client as a function
// Taken from https://github.com/websockets/ws

function echo() {

    const ws = new Wc3WebSocket('wss://echo.websocket.org/', [], 'https://websocket.org');

    ws.onopen = () => {
        console.log('connected');
        ws.send(JSON.stringify(Date.now()));
    };

    ws.onclose = () => {
        console.log('disconnected');
    };

    ws.onmessage = (evt) => {

        const data = evt.data;
        console.log(`Roundtrip time: ${Date.now() - data} ms`);

        setTimeout(function timeout() {
            ws.send(JSON.stringify(Date.now()));
        }, 500);
    };

}

module.exports = echo;
