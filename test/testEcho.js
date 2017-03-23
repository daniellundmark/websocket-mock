/* eslint quote-props: 0 */
/* globals describe:true, it:true */
'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const WsMock = require('./mocks/wsMock');

// This tests the echo.js file which is a function.
// We then need to get the WsMock instance from being the scenes

describe('echo', () => {

    var echo;

    // We need to do this per test to clear the instances in the WsMock
    beforeEach(() => {
        echo = proxyquire('../echo', {
            'ws': WsMock
        });
        
    });

    it('should send date on open', (done) => {
        echo();

        const wsmock = WsMock.instancesForTest()[0];

        wsmock.once('received', (data) => {
            assert.ok(data, 'Should receive data');
            assert.strictEqual(typeof data, typeof Date.now(), 'Message should be of the right type');
            done();
        });

        wsmock.emit('open');

        wsmock.onopen
    });

    it('should send date again on message', (done) => {

        var messageCounter = 0;

        echo();

        const wsmock = WsMock.instancesForTest()[0];

        wsmock.on('received', (data) => {
            messageCounter++;
            wsmock.reply(data);
        });

        wsmock.emit('open');

        setTimeout(() => {

            assert.strictEqual(messageCounter, 2);
            done();

        }, 750);

    });

});
