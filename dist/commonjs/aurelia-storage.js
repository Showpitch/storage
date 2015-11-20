'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Storage = (function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.persistedTopics = {};
        this.storage = window.localStorage;
        this.session = window.sessionStorage;

        this.getPersistedTopics();
    }

    Storage.prototype.getPersistedTopics = function getPersistedTopics() {
        var x = Object.keys(this.storage);

        for (var i = 0; i < x.length; i++) {
            this.persistedTopics[x[i]] = true;
        }
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
            this.persistedTopics[topic] = true;
            this.storage.setItem(topic, value);
        } else {
            this.session.setItem(topic, value);
        }
    };

    Storage.prototype.retrieveTopic = function retrieveTopic(topic) {
        if (this.persistedTopics[topic]) {
            return JSON.parse(this.storage.getItem(topic));
        } else {
            return JSON.parse(this.session.getItem(topic));
        }
    };

    Storage.prototype.deleteTopic = function deleteTopic(topic) {
        if (this.persistedTopics[topic]) {
            delete this.persistedTopics[topic];
            this.storage.removeItem(topic);
        } else {
            this.session.removeItem(topic);
        }
    };

    return Storage;
})();

exports.Storage = Storage;