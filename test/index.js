const ServerMock = require("mock-http-server");
const assert = require('chai').assert;

const remoteFor = require("../index");

describe('Sony-Audio Remote', function () {

    const server = new ServerMock({host: "localhost", port: 9000});

    beforeEach(function (done) {
        server.start(done);
    });

    afterEach(function (done) {
        server.stop(done);
    });

    describe('new remote', function () {
        it('should return an object', async () => {

            server.on({});

            const ampRemote = await remoteFor("http://localhost:9000");

            assert.isNotNull(ampRemote);
        });

        it('should send the signal to turn off', async () => {
            server.on({
                method: 'POST',
                path: '/sony/system',
                filter: hasBodyEqualTo({
                    id: 1,
                    method: 'setPowerStatus',
                    version: '1.1',
                    params: [{status: 'off'}]
                }),
                reply: {
                    status: 200,
                    headers: {},
                    body: ""
                }
            });
            const ampRemote = await remoteFor("http://localhost:9000");

            await ampRemote.turnOff();
        });

        it('should send the signal to turn on', async () => {
            server.on({
                method: 'POST',
                path: '/sony/system',
                filter: hasBodyEqualTo({
                    id: 1,
                    method: 'setPowerStatus',
                    version: '1.1',
                    params: [{status: 'on'}]
                }),
                reply: {
                    status: 200,
                    headers: {},
                    body: ""
                }
            });
            const ampRemote = await remoteFor("http://localhost:9000");

            await ampRemote.turnOn();
        });
    });

});

function hasBodyEqualTo(body) {
    return (req) => {
        assert.deepEqual(req.body, body)
        return true;
    }
}