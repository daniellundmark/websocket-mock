'use strict';

const EventEmitter = require('events');

class W3CWSMock extends EventEmitter {

    constructor(url, options, origin) {
        super();
        W3CWSMock._instances = W3CWSMock._instances || [];
        W3CWSMock._instances.push(this); // This is to get it in the tests
        this._buffer = [];
    }

    // This is used to mimic a "real" ws object
    // And to give the test access to the data passed to the websocket
    send(data) {
        this._buffer.push(data);
        process.nextTick(() => this.onreceived(data));
    }

    // The following methods are used by the tests
    // The test may also use .onopen, .onclose, .onerror, etc.
    reply (msg) {
        process.nextTick(() => this.onmessage({data: msg}));
    }

    buffer() {
        return this._buffer;
    }

    pop() {
        return this._buffer.pop();
    }

    static instancesForTest(){
        return W3CWSMock._instances;
    }

}

module.exports = W3CWSMock;
