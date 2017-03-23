/* eslint quote-props: 0 */
/* globals describe:true, it:true */
'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const WsMock = require('./mocks/wsMock');

// This tests the echo-class.js file which is a class.
// We then need to get the WsMock instance directly from the object


describe('echo', () => {

    var Echo;

    // We need to do this per test to clear the instances in the WsMock
    beforeEach(() => {
        Echo = proxyquire('../echo-class', {
            'ws': WsMock
        });

    });

    it('should send date on open', () => {
        const echo = new Echo();

        const wsmock = echo.ws;
        wsmock.emit('open');

        assert.ok(wsmock.buffer().length, 'Should have received one message');
        assert.strictEqual(typeof wsmock.buffer()[0], typeof Date.now(), 'Should have received a date');
    });

    it('should send date again on message', (done) => {

        const echo = new Echo();

        const wsmock = echo.ws;
        wsmock.emit('open');

        const received = wsmock.pop();

        assert.ok(received, 'Should have received a message');

        wsmock.emit('message', received);

        setTimeout(() => {

            assert.ok(received, 'Should have received one additional message');
            done();

        }, 750);

    });

});
