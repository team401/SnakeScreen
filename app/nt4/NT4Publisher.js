"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NT4PublisherStatus = exports.NT4Publisher = void 0;
const IPAddresses_1 = require("../../../shared/IPAddresses");
const LogUtil_1 = require("../../../shared/log/LogUtil");
const LoggableType_1 = require("../../../shared/log/LoggableType");
const NT4_1 = require("./NT4");
/** Publishes the current values of every field to an NT server. */
class NT4Publisher {
    constructor(isSim, statusCallback) {
        var _a;
        this.PERIOD = 0.02;
        this.interval = null;
        this.stopped = false;
        this.publishedTopics = {};
        this.statusCallback = statusCallback;
        // Get address
        let address = "";
        if (isSim) {
            address = IPAddresses_1.SIM_ADDRESS;
        }
        else if ((_a = window.preferences) === null || _a === void 0 ? void 0 : _a.usb) {
            address = IPAddresses_1.USB_ADDRESS;
        }
        else {
            if (window.preferences) {
                address = window.preferences.rioAddress;
            }
        }
        // Create client
        statusCallback(NT4PublisherStatus.Connecting);
        this.client = new NT4_1.NT4Client(address, "AdvantageScope", () => { }, () => { }, () => { }, () => {
            if (!this.stopped) {
                statusCallback(NT4PublisherStatus.Active);
            }
        }, () => {
            if (!this.stopped) {
                statusCallback(NT4PublisherStatus.Connecting);
            }
        });
        // Start
        this.client.connect();
        this.interval = window.setInterval(() => this.periodic(), this.PERIOD * 1000);
    }
    stop() {
        this.stopped = true;
        this.statusCallback(NT4PublisherStatus.Stopped);
        this.client.disconnect();
        if (this.interval !== null)
            window.clearInterval(this.interval);
    }
    periodic() {
        let serverTime = this.client.getServerTime_us();
        if (serverTime === null)
            serverTime = 0;
        // Update published topics
        if (!window.preferences)
            return;
        let topicsToPublish = (0, LogUtil_1.filterFieldByPrefixes)(window.log.getFieldKeys(), window.preferences.publishFilter, true, true).filter((topic) => !topic.startsWith("$") &&
            !window.log.isGenerated(topic) &&
            window.log.getType(topic) != LoggableType_1.default.Empty);
        topicsToPublish.forEach((topic) => {
            if (!(topic in this.publishedTopics)) {
                // Publish new topic
                let type = "";
                switch (window.log.getType(topic)) {
                    case LoggableType_1.default.Raw:
                        type = "raw";
                        break;
                    case LoggableType_1.default.Boolean:
                        type = "boolean";
                        break;
                    case LoggableType_1.default.Number:
                        type = "double";
                        break;
                    case LoggableType_1.default.String:
                        type = "string";
                        break;
                    case LoggableType_1.default.BooleanArray:
                        type = "boolean[]";
                        break;
                    case LoggableType_1.default.NumberArray:
                        type = "double[]";
                        break;
                    case LoggableType_1.default.StringArray:
                        type = "string[]";
                        break;
                }
                let wpilibType = window.log.getWpilibType(topic);
                if (wpilibType !== null) {
                    type = wpilibType;
                    // NT4 uses "int" but wpilog uses "int64"
                    if (type === "int64") {
                        type = "int";
                    }
                    if (type === "int64[]") {
                        type = "int[]";
                    }
                }
                this.client.publishTopic(topic.slice(3), type);
                this.publishedTopics[topic] = null;
            }
        });
        Object.keys(this.publishedTopics).forEach((topic) => {
            if (!topicsToPublish.includes(topic)) {
                // Unpublish old topic
                this.client.unpublishTopic(topic.slice(3));
                delete this.publishedTopics[topic];
            }
        });
        // Get publishing timestamp
        let time;
        let hoveredTime = window.selection.getHoveredTime();
        let selectedTime = window.selection.getSelectedTime();
        if (selectedTime !== null) {
            time = selectedTime;
        }
        else if (hoveredTime !== null) {
            time = hoveredTime;
        }
        else {
            time = window.log.getTimestampRange()[0];
        }
        // Add samples
        Object.keys(this.publishedTopics).forEach((topic) => {
            let lastValue = this.publishedTopics[topic];
            let value = null;
            let type = window.log.getType(topic);
            switch (type) {
                case LoggableType_1.default.Raw:
                    value = (0, LogUtil_1.getOrDefault)(window.log, topic, LoggableType_1.default.Raw, time, new Uint8Array());
                    break;
                case LoggableType_1.default.Boolean:
                    value = (0, LogUtil_1.getOrDefault)(window.log, topic, LoggableType_1.default.Boolean, time, false);
                    break;
                case LoggableType_1.default.Number:
                    value = (0, LogUtil_1.getOrDefault)(window.log, topic, LoggableType_1.default.Number, time, 0);
                    break;
                case LoggableType_1.default.String:
                    value = (0, LogUtil_1.getOrDefault)(window.log, topic, LoggableType_1.default.String, time, "");
                    break;
                case LoggableType_1.default.BooleanArray:
                    value = (0, LogUtil_1.getOrDefault)(window.log, topic, LoggableType_1.default.BooleanArray, time, []);
                    break;
                case LoggableType_1.default.NumberArray:
                    value = (0, LogUtil_1.getOrDefault)(window.log, topic, LoggableType_1.default.NumberArray, time, []);
                    break;
                case LoggableType_1.default.StringArray:
                    value = (0, LogUtil_1.getOrDefault)(window.log, topic, LoggableType_1.default.StringArray, time, []);
                    break;
            }
            let hasChanged = lastValue === null || !(0, LogUtil_1.logValuesEqual)(type, value, lastValue);
            if (hasChanged) {
                this.publishedTopics[topic] = value;
                if (value !== null) {
                    this.client.addTimestampedSample(topic.slice(3), serverTime, value);
                }
            }
        });
    }
}
exports.NT4Publisher = NT4Publisher;
var NT4PublisherStatus;
(function (NT4PublisherStatus) {
    NT4PublisherStatus[NT4PublisherStatus["Connecting"] = 0] = "Connecting";
    NT4PublisherStatus[NT4PublisherStatus["Active"] = 1] = "Active";
    NT4PublisherStatus[NT4PublisherStatus["Stopped"] = 2] = "Stopped";
})(NT4PublisherStatus || (exports.NT4PublisherStatus = NT4PublisherStatus = {}));
//# sourceMappingURL=NT4Publisher.js.map