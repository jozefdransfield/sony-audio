const rp = require('request-promise');
const _ = require('lodash');

async function remoteFor(address) {
    return new Remote(address);
}

class Remote {
    constructor(address) {
        this.address = address;
    }

    async request(service, name, version, params) {
        const url = this.address + '/sony/' + service;
        const response = await rp({
            method: "POST",
            uri: url,
            timeout: 1000,
            json: {
                'id': 1,
                'method': name,
                'version': version,
                'params': params
            }
        });
        return response
    }

    async systemRequest(name, version, params) {
        return this.request('system', name, version, params);
    }

    async avContentRequest(name, version, params) {
        return this.request('avContent', name, version, params);
    }

    async getPowerStatus() {
        const response = await this.systemRequest('getPowerStatus', '1.1', [])
        return response.result[0].status;
    }

    async turnOff() {
        const response = await this.systemRequest("setPowerStatus", "1.1", [{status: "off"}]);
        return true;
    }

    async turnOn() {
        const response = await this.systemRequest("setPowerStatus", "1.1", [{status: "on"}]);
        return true;
    }

    async getSchemeList() {
        const response = await this.avContentRequest('getSchemeList', '1.0', []);
        return response.result;
    }

    async getSourceList(scheme) {
        const response = await this.avContentRequest('getSourceList', '1.2', [{
            "scheme": scheme
        }]);
        return response;
    }
}

module.exports = remoteFor;

