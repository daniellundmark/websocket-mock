'use strict';

const EventEmitter = require('events');

class WsMock extends EventEmitter {
    
    constructor(url, options) {
        super();
        WsMock._instances = WsMock._instances || [];
        WsMock._instances.push(this); // This is to get it in the tests
        this._buffer = [];
    }
    
    // This is used to mimic a "real" ws object
    // And to give the test access to the data passed to the websocket
    send(data) {
        this._buffer.push(data);
        process.nextTick(() => this.emit('received',  data));
    }

    // The following methods are used by the tests
    // The test may also use .emit('open), .emit('close'), etc.
    reply (json) {
         process.nextTick(() => this.emit('message', json));
    }

    buffer() {
        return this._buffer;
    }
    
    pop() {
        return this._buffer.pop();
    }
    
    static instancesForTest(){
        return WsMock._instances;
    }
    
}

module.exports = WsMock;
