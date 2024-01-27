"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggableType_1 = require("../../../shared/log/LoggableType");
const NT4Source_1 = require("./NT4Source");
class NT4Tuner {
    constructor(client) {
        this.client = client;
    }
    isTunable(key) {
        const remoteKey = this.getRemoteKey(key);
        const type = window.log.getType(key);
        return ((type === LoggableType_1.default.Number || type === LoggableType_1.default.Boolean) &&
            !remoteKey.startsWith(NT4Source_1.AKIT_PREFIX) &&
            !window.log.isGenerated(key));
    }
    publish(key, value) {
        if (!this.isTunable(key))
            return;
        const remoteKey = this.getRemoteKey(key);
        const type = window.log.getWpilibType(key);
        if (type === null)
            return;
        this.client.publishTopic(remoteKey, type);
        if (typeof value === "number") {
            this.client.addSample(remoteKey, type.startsWith("int") ? Math.floor(value) : value);
        }
        else {
            this.client.addSample(remoteKey, value);
        }
    }
    unpublish(key) {
        const remoteKey = this.getRemoteKey(key);
        this.client.unpublishTopic(remoteKey);
    }
    getRemoteKey(key) {
        return key.slice(NT4Source_1.WPILOG_PREFIX.length);
    }
}
exports.default = NT4Tuner;
//# sourceMappingURL=NT4Tuner.js.map