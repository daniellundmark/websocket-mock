'use strict';

const WebSocket = require('ws');

// The websocket echo client as a class

class Echo {

    constructor() {
        this.ws = new WebSocket('wss://echo.websocket.org/', {
            origin: 'https://websocket.org'
        });

        this.ws.on('open', () => {
            console.log('connected');
            this.ws.send(Date.now());
        });

        this.ws.on('close', () => {
            console.log('disconnected');
        });

        this.ws.on('message', (data, flags) => {
            console.log(`Roundtrip time: ${Date.now() - data} ms`, flags);

            setTimeout(() => {
                this.ws.send(Date.now());
            }, 500);
        });
    }
    
}

module.exports = Echo;
