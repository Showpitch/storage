'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var Storage = (function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.index = {};
        this.storage = window.localStorage;
        this.session = window.sessionStorage;

        this.loadIndex();
    }

    Storage.prototype.loadIndex = function loadIndex() {
        var x = Object.keys(this.storage);

        for (var i = 0; i < x.length; i++) {
            this.index[x[i]] = true;
        }
    };

    Storage.prototype.store = function store(key, value) {
        var expiration = arguments.length <= 2 || arguments[2] === undefined ? 60 * 60 * 24 * 14 : arguments[2];
        var session = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

        var item = JSON.stringify({ stamp: _moment2['default']().add(expiration, 'seconds'), data: value });

        if (!session) {
            this.index[key] = true;
            this.storage.setItem(key, item);
        } else {
            this.session.setItem(key, item);
        }
    };

    Storage.prototype.retrieve = function retrieve(key) {
        var returnItem = JSON.parse(this[this.index[key] ? 'storage' : 'session'].getItem(key));

        if (returnItem && _moment2['default']() <= _moment2['default'](returnItem.stamp)) {
            return returnItem.data;
        }

        this.remove(key);

        return null;
    };

    Storage.prototype.remove = function remove(key) {
        this[this.index[key] ? 'storage' : 'session'].removeItem(key);
        delete this.index[key];
    };

    Storage.prototype.saveTopic = function saveTopic(topic, value) {
        var isLocal = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        if (topic === undefined || value === undefined) {
            return;
        }

        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }

        if (isLocal) {
            this.index[topic] = true;
            this.storage.setItem(topic, value);
        } else {
            this.session.setItem(topic, value);
        }
    };

    Storage.prototype.retrieveTopic = function retrieveTopic(topic) {
        if (this.index[topic]) {
            return this.isJsonString(this.storage.getItem(topic)) ? JSON.parse(this.storage.getItem(topic)) : this.storage.getItem(topic);
        } else {
            return this.isJsonString(this.session.getItem(topic)) ? JSON.parse(this.session.getItem(topic)) : this.session.getItem(topic);
        }
    };

    Storage.prototype.deleteTopic = function deleteTopic(topic) {
        if (this.index[topic]) {
            delete this.index[topic];
            this.storage.removeItem(topic);
        } else {
            this.session.removeItem(topic);
        }
    };

    Storage.prototype.isJsonString = function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    return Storage;
})();

exports.Storage = Storage;