/**
 * Created by ericjohnson on 10/6/15.
 */

import moment from 'moment';

export class Storage {
    constructor() {
        this.index = {};
        this.storage = window.localStorage;
        this.session = window.sessionStorage;

        // reload index if needed
        this.loadIndex();
    }

    loadIndex() {
        let x = Object.keys(this.storage);

        for (var i = 0; i < x.length; i++) {
            this.index[x[i]] = true;
        }
    }

    store(key, value, expiration = (60*60*24*14), session = true) { // expiration default is 14 days multiplied by seconds
        let item = JSON.stringify({stamp: moment().add(expiration, 'seconds'), data: value});

        if(!session){
            this.index[key] = true;
            this.storage.setItem(key, item);
        }
        else{
            this.session.setItem(key, item);
        }
    }

    retrieve(key){
        let returnItem = JSON.parse(this[this.index[key] ? 'storage': 'session'].getItem(key));

        // if exists and not expired then return value
        if(returnItem && moment() <= moment(returnItem.stamp)){
            return returnItem.data;
        }

        // else, clear from storage and return null
        this.remove(key);

        return null;
    }

    remove(key){
        this[this.index[key] ? 'storage': 'session'].removeItem(key);
        delete this.index[key];
    }

    saveTopic(topic, value, isLocal = false) {

        if (topic === undefined || value === undefined) {
            return
        }

        // convert to JSON if needed
        if (typeof(value) == 'object') {
            value = JSON.stringify(value);
        }

        if (isLocal) {
            this.index[topic] = true;
            this.storage.setItem(topic, value);
        } else {
            this.session.setItem(topic, value);
        }
    }

    retrieveTopic(topic) {
        if (this.index[topic]) {
            return this.isJsonString(this.storage.getItem(topic)) ? JSON.parse(this.storage.getItem(topic)) : this.storage.getItem(topic);
        } else {
            return this.isJsonString(this.session.getItem(topic)) ? JSON.parse(this.session.getItem(topic)) : this.session.getItem(topic);

        }
    }

    deleteTopic(topic) {
        if (this.index[topic]) {
            delete this.index[topic];
            this.storage.removeItem(topic);
        } else {
            this.session.removeItem(topic);
        }
    }

    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}