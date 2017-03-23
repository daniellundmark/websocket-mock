/* eslint quote-props: 0 */
/* globals describe:true, it:true */
'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const WsMock = require('./mocks/w3cWsMock');

// This tests the echo.js file which is a function.
// We then need to get the WsMock instance from being the scenes

describe('echo', () => {

    var echo;

    // We need to do this per test to clear the instances in the WsMock
    beforeEach(() => {
        echo = proxyquire('../w3c-echo', {
            'websocket': { w3cwebsocket: WsMock }
        });

    });

    it('should send date on open', (done) => {
        echo();

        const wsmock = WsMock.instancesForTest()[0];

        wsmock.onreceived = (data) => {
            assert.ok(data, 'Should receive data');
            done();
        };

        wsmock.onopen();
        
    });


});
