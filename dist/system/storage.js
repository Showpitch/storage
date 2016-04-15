'use strict';

System.register(['moment'], function (_export, _context) {
    var moment, Storage;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_moment) {
            moment = _moment.default;
        }],
        execute: function () {
            _export('Storage', Storage = function () {
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
                    var session = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
                    var expiration = arguments.length <= 3 || arguments[3] === undefined ? 60 * 60 * 24 * 14 : arguments[3];

                    var item = JSON.stringify({ stamp: moment().add(expiration, 'seconds'), data: value });
                    if (session) {
                        this.session.setItem(key, item);
                    } else {
                        this.index[key] = true;
                        this.storage.setItem(key, item);
                    }
                };

                Storage.prototype.retrieve = function retrieve(key) {
                    var returnItem = JSON.parse(this[this.index[key] ? 'storage' : 'session'].getItem(key));

                    if (returnItem && moment() <= moment(returnItem.stamp)) {
                        return returnItem.data;
                    }

                    this.remove(key);

                    return null;
                };

                Storage.prototype.remove = function remove(key) {
                    this[this.index[key] ? 'storage' : 'session'].removeItem(key);
                    delete this.index[key];
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
            }());

            _export('Storage', Storage);
        }
    };
});