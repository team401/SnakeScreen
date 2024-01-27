"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AKIT_PREFIX = exports.WPILOG_PREFIX = void 0;
const Log_1 = require("../../../shared/log/Log");
const LogUtil_1 = require("../../../shared/log/LogUtil");
const LoggableType_1 = require("../../../shared/log/LoggableType");
const ProtoDecoder_1 = require("../../../shared/log/ProtoDecoder");
const util_1 = require("../../../shared/util");
const LiveDataSource_1 = require("../LiveDataSource");
const CustomSchemas_1 = require("../schema/CustomSchemas");
const NT4_1 = require("./NT4");
const NT4Tuner_1 = require("./NT4Tuner");
exports.WPILOG_PREFIX = "NT:";
exports.AKIT_PREFIX = "/AdvantageKit";
class NT4Source extends LiveDataSource_1.LiveDataSource {
    constructor(akitMode) {
        super();
        this.client = null;
        this.shouldRunOutputCallback = false;
        this.connectTime = null;
        this.periodicCallback = null;
        this.noFieldsTimeout = null;
        this.loggingSubscription = null;
        this.lowBandwidthTopicSubscription = null;
        this.lowBandwidthDataSubscriptions = {};
        this.akitMode = akitMode;
        this.periodicCallback = setInterval(() => {
            var _a;
            // Update timestamp range based on connection time
            if (this.client !== null && this.connectTime !== null) {
                let connectServerTime = this.client.getServerTime_us(this.connectTime);
                if (connectServerTime !== null)
                    window.log.clearBeforeTime(connectServerTime / 1e6);
            }
            // Update subscriptions
            if (this.client !== null) {
                if (((_a = window.preferences) === null || _a === void 0 ? void 0 : _a.liveSubscribeMode) === "logging") {
                    // Switch to logging subscribe mode
                    Object.values(this.lowBandwidthDataSubscriptions).forEach((subscriptionId) => {
                        var _a;
                        (_a = this.client) === null || _a === void 0 ? void 0 : _a.unsubscribe(subscriptionId);
                    });
                    this.lowBandwidthDataSubscriptions = {};
                    if (this.lowBandwidthTopicSubscription !== null) {
                        this.client.unsubscribe(this.lowBandwidthTopicSubscription);
                        this.lowBandwidthTopicSubscription = null;
                    }
                    if (this.loggingSubscription === null) {
                        this.loggingSubscription = this.client.subscribe([this.akitMode ? exports.AKIT_PREFIX + "/" : ""], true, true, 0.02);
                    }
                }
                else {
                    // Switch to low bandwidth subscribe mode
                    if (this.loggingSubscription !== null) {
                        this.client.unsubscribe(this.loggingSubscription);
                        this.loggingSubscription = null;
                    }
                    if (this.lowBandwidthTopicSubscription === null) {
                        this.lowBandwidthTopicSubscription =
                            this.client.subscribeTopicsOnly([this.akitMode ? exports.AKIT_PREFIX + "/" : ""], true);
                    }
                    // Add active fields
                    let activeFields = new Set();
                    if (window.log === this.log) {
                        let announcedKeys = this.log
                            .getFieldKeys()
                            .filter((key) => { var _a; return ((_a = this.log) === null || _a === void 0 ? void 0 : _a.getType(key)) !== LoggableType_1.default.Empty; });
                        let enabledKey = (0, LogUtil_1.getEnabledKey)(this.log);
                        [
                            ...(this.akitMode
                                ? ["/.schema", "/Timestamps"]
                                : [
                                    exports.WPILOG_PREFIX + "/.schema",
                                    exports.WPILOG_PREFIX + exports.AKIT_PREFIX + "/.schema",
                                    exports.WPILOG_PREFIX + exports.AKIT_PREFIX + "/Timestamp",
                                ]),
                            ...(enabledKey === undefined ? [] : [enabledKey]),
                            ...window.tabs.getActiveFields(),
                            ...window.sidebar.getActiveFields(),
                        ].forEach((key) => {
                            // Compare to announced keys
                            announcedKeys.forEach((announcedKey) => {
                                let subscribeKey = null;
                                if (announcedKey.startsWith(key)) {
                                    subscribeKey = key;
                                }
                                else if (key.startsWith(announcedKey)) {
                                    subscribeKey = announcedKey;
                                }
                                if (subscribeKey !== null) {
                                    if (akitMode) {
                                        activeFields.add(exports.AKIT_PREFIX + subscribeKey);
                                    }
                                    else {
                                        activeFields.add(subscribeKey.slice(exports.WPILOG_PREFIX.length));
                                    }
                                }
                            });
                        });
                    }
                    // Remove duplicates based on prefixes
                    let activeFieldsCopy = new Set(activeFields);
                    activeFieldsCopy.forEach((field0) => {
                        activeFieldsCopy.forEach((field1) => {
                            if (field0 !== field1 && field0.startsWith(field1)) {
                                activeFields.delete(field0);
                            }
                        });
                    });
                    // Update subscriptions
                    activeFields.forEach((field) => {
                        if (this.client === null)
                            return;
                        if (!(field in this.lowBandwidthDataSubscriptions)) {
                            // Prefix match required for mechanisms, joysticks, and metadata
                            this.lowBandwidthDataSubscriptions[field] = this.client.subscribe([field], true, true, 0.02);
                        }
                    });
                    Object.entries(this.lowBandwidthDataSubscriptions).forEach(([field, subscriptionId]) => {
                        var _a;
                        if (!activeFields.has(field)) {
                            (_a = this.client) === null || _a === void 0 ? void 0 : _a.unsubscribe(subscriptionId);
                            delete this.lowBandwidthDataSubscriptions[field];
                        }
                    });
                }
            }
            // Check if output callback should be triggered (prevents
            // running the callback many times for each frame)
            if (!this.shouldRunOutputCallback ||
                this.status === LiveDataSource_1.LiveDataSourceStatus.Stopped ||
                !this.outputCallback ||
                !this.log)
                return;
            this.shouldRunOutputCallback = false;
            this.outputCallback(this.log, () => {
                if (this.client) {
                    let serverTime = this.client.getServerTime_us();
                    if (serverTime === null) {
                        return 10;
                    }
                    else {
                        return (serverTime - this.client.getNetworkLatency_us()) / 1000000;
                    }
                }
                else {
                    return 10;
                }
            });
        }, 1000 / 60);
    }
    connect(address, statusCallback, outputCallback) {
        super.connect(address, statusCallback, outputCallback);
        this.shouldRunOutputCallback = false;
        if (window.preferences === null) {
            this.setStatus(LiveDataSource_1.LiveDataSourceStatus.Error);
        }
        else {
            this.log = new Log_1.default();
            this.client = new NT4_1.NT4Client(address, "AdvantageScope", (topic) => {
                // Announce
                if (!this.log)
                    return;
                if (this.noFieldsTimeout)
                    clearTimeout(this.noFieldsTimeout);
                if (topic.name === "")
                    return;
                let modifiedKey = this.getKeyFromTopic(topic);
                let structuredType = null;
                if (topic.type.startsWith(LogUtil_1.STRUCT_PREFIX)) {
                    structuredType = topic.type.split(LogUtil_1.STRUCT_PREFIX)[1];
                    if (structuredType.endsWith("[]")) {
                        structuredType = structuredType.slice(0, -2);
                    }
                }
                else if (topic.type.startsWith(LogUtil_1.PROTO_PREFIX)) {
                    structuredType = ProtoDecoder_1.default.getFriendlySchemaType(topic.type.split(LogUtil_1.PROTO_PREFIX)[1]);
                }
                else if (topic.type === "msgpack") {
                    structuredType = "MessagePack";
                }
                else if (topic.type === "json") {
                    structuredType = "JSON";
                }
                this.log.createBlankField(modifiedKey, this.getLogType(topic.type));
                this.log.setWpilibType(modifiedKey, topic.type);
                this.log.setStructuredType(modifiedKey, structuredType);
                this.shouldRunOutputCallback = true;
            }, (topic) => {
                // Unannounce
            }, (topic, timestamp_us, value) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                // Data
                if (!this.log || !this.client || topic.name === "")
                    return;
                let key = this.getKeyFromTopic(topic);
                let timestamp = Math.max(timestamp_us, this.log.getTimestampRange()[0]) / 1000000;
                let updated = false;
                switch (topic.type) {
                    case "boolean":
                        if (typeof value === "boolean") {
                            (_a = this.log) === null || _a === void 0 ? void 0 : _a.putBoolean(key, timestamp, value);
                            updated = true;
                        }
                        else {
                            console.warn('Expected a boolean value for "' + key + '" but got:', value);
                        }
                        break;
                    case "int":
                    case "float":
                    case "double":
                        if (typeof value === "number") {
                            (_b = this.log) === null || _b === void 0 ? void 0 : _b.putNumber(key, timestamp, value);
                            updated = true;
                        }
                        else {
                            console.warn('Expected a number value for "' + key + '" but got:', value);
                        }
                        break;
                    case "string":
                        if (typeof value === "string") {
                            (_c = this.log) === null || _c === void 0 ? void 0 : _c.putString(key, timestamp, value);
                            updated = true;
                        }
                        else {
                            console.warn('Expected a string value for "' + key + '" but got:', value);
                        }
                        break;
                    case "boolean[]":
                        if ((0, util_1.checkArrayType)(value, "boolean")) {
                            (_d = this.log) === null || _d === void 0 ? void 0 : _d.putBooleanArray(key, timestamp, value);
                            updated = true;
                        }
                        else {
                            console.warn('Expected a boolean[] value for "' + key + '" but got:', value);
                        }
                        break;
                    case "int[]":
                    case "float[]":
                    case "double[]":
                        if ((0, util_1.checkArrayType)(value, "number")) {
                            (_e = this.log) === null || _e === void 0 ? void 0 : _e.putNumberArray(key, timestamp, value);
                            updated = true;
                        }
                        else {
                            console.warn('Expected a number[] value for "' + key + '" but got:', value);
                        }
                        break;
                    case "string[]":
                        if ((0, util_1.checkArrayType)(value, "string")) {
                            (_f = this.log) === null || _f === void 0 ? void 0 : _f.putStringArray(key, timestamp, value);
                            updated = true;
                        }
                        else {
                            console.warn('Expected a string[] value for "' + key + '" but got:', value);
                        }
                        break;
                    case "json":
                        if (typeof value === "string") {
                            (_g = this.log) === null || _g === void 0 ? void 0 : _g.putJSON(key, timestamp, value);
                            updated = true;
                        }
                        else {
                            console.warn('Expected a string value for "' + key + '" but got:', value);
                        }
                        break;
                    case "msgpack":
                        if (value instanceof Uint8Array) {
                            (_h = this.log) === null || _h === void 0 ? void 0 : _h.putMsgpack(key, timestamp, value);
                            updated = true;
                        }
                        else {
                            console.warn('Expected a raw value for "' + key + '" but got:', value);
                        }
                        break;
                    default: // Default to raw
                        if (value instanceof Uint8Array) {
                            if (topic.type.startsWith(LogUtil_1.STRUCT_PREFIX)) {
                                let schemaType = topic.type.split(LogUtil_1.STRUCT_PREFIX)[1];
                                if (schemaType.endsWith("[]")) {
                                    (_j = this.log) === null || _j === void 0 ? void 0 : _j.putStruct(key, timestamp, value, schemaType.slice(0, -2), true);
                                }
                                else {
                                    (_k = this.log) === null || _k === void 0 ? void 0 : _k.putStruct(key, timestamp, value, schemaType, false);
                                }
                            }
                            else if (topic.type.startsWith(LogUtil_1.PROTO_PREFIX)) {
                                let schemaType = topic.type.split(LogUtil_1.PROTO_PREFIX)[1];
                                (_l = this.log) === null || _l === void 0 ? void 0 : _l.putProto(key, timestamp, value, schemaType);
                            }
                            else {
                                (_m = this.log) === null || _m === void 0 ? void 0 : _m.putRaw(key, timestamp, value);
                                if (CustomSchemas_1.default.has(topic.type)) {
                                    try {
                                        CustomSchemas_1.default.get(topic.type)(this.log, key, timestamp, value);
                                    }
                                    catch (_o) {
                                        console.error('Failed to decode custom schema "' + topic.type + '"');
                                    }
                                    this.log.setGeneratedParent(key);
                                }
                            }
                            updated = true;
                        }
                        else {
                            console.warn('Expected a raw value for "' + key + '" but got:', value);
                        }
                        break;
                }
                if (updated) {
                    this.shouldRunOutputCallback = true;
                }
            }, () => {
                // Connected
                this.setStatus(LiveDataSource_1.LiveDataSourceStatus.Active);
                this.log = new Log_1.default();
                this.shouldRunOutputCallback = true;
                if (!this.connectTime && this.client !== null) {
                    this.connectTime = this.client.getClientTime_us();
                }
                if (this.akitMode) {
                    this.noFieldsTimeout = setTimeout(() => {
                        window.sendMainMessage("error", {
                            title: "Problem with NT4 connection",
                            content: "No fields were received from the server. AdvantageKit mode is selected. Are you connecting to a server without AdvantageKit?",
                        });
                    }, 5000);
                }
            }, () => {
                // Disconnected
                this.setStatus(LiveDataSource_1.LiveDataSourceStatus.Connecting);
                this.shouldRunOutputCallback = false;
                this.connectTime = null;
                if (this.noFieldsTimeout)
                    clearTimeout(this.noFieldsTimeout);
            });
            // Start connection
            this.client.connect();
        }
    }
    stop() {
        var _a;
        super.stop();
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.disconnect();
        if (this.periodicCallback !== null)
            clearInterval(this.periodicCallback);
    }
    getTuner() {
        if (this.akitMode) {
            // Tuning is not applicable with AdvantageKit
            return null;
        }
        else if (this.client === null || this.log === null) {
            throw "Cannot create NT4 tuner before starting connection";
        }
        else {
            return new NT4Tuner_1.default(this.client);
        }
    }
    /** Gets the name of the topic, depending on whether we're running in AdvantageKit mode. */
    getKeyFromTopic(topic) {
        if (this.akitMode) {
            return topic.name.slice(exports.AKIT_PREFIX.length);
        }
        else {
            return exports.WPILOG_PREFIX + topic.name;
        }
    }
    getLogType(ntType) {
        switch (ntType) {
            case "boolean":
                return LoggableType_1.default.Boolean;
            case "int":
            case "float":
            case "double":
                return LoggableType_1.default.Number;
            case "string":
            case "json":
                return LoggableType_1.default.String;
            case "boolean[]":
                return LoggableType_1.default.BooleanArray;
            case "int[]":
            case "float[]":
            case "double[]":
                return LoggableType_1.default.NumberArray;
            case "string[]":
                return LoggableType_1.default.StringArray;
            default: // Default to raw
                return LoggableType_1.default.Raw;
        }
    }
}
exports.default = NT4Source;
//# sourceMappingURL=NT4Source.js.map