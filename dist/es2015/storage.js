

import moment from 'moment';

export let Storage = class Storage {
    constructor() {
        this.index = {};
        this.storage = window.localStorage;
        this.session = window.sessionStorage;

        this.loadIndex();
    }

    loadIndex() {
        let x = Object.keys(this.storage);

        for (var i = 0; i < x.length; i++) {
            this.index[x[i]] = true;
        }
    }

    store(key, value, session = true, expiration = 60 * 60 * 24 * 14) {
        let item = JSON.stringify({ stamp: moment().add(expiration, 'seconds'), data: value });
        if (session) {
            this.session.setItem(key, item);
        } else {
            this.index[key] = true;
            this.storage.setItem(key, item);
        }
    }

    retrieve(key) {
        let returnItem = JSON.parse(this[this.index[key] ? 'storage' : 'session'].getItem(key));

        if (returnItem && moment() <= moment(returnItem.stamp)) {
            return returnItem.data;
        }

        this.remove(key);

        return null;
    }

    remove(key) {
        this[this.index[key] ? 'storage' : 'session'].removeItem(key);
        delete this.index[key];
    }

    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
};