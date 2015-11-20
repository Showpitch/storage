/**
 * Created by ericjohnson on 10/6/15.
 */

export class Storage {
    constructor() {
        this.persistedTopics = {};
        this.storage = window.localStorage;
        this.session = window.sessionStorage;

        // reload persisted library if needed
        this.getPersistedTopics();
    }

    getPersistedTopics() {
        let x = Object.keys(this.storage);

        for (var i = 0; i < x.length; i++) {
            this.persistedTopics[x[i]] = true;
        }
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
            this.persistedTopics[topic] = true;
            this.storage.setItem(topic, value);
        } else {
            this.session.setItem(topic, value);
        }
    }

    retrieveTopic(topic) {
        if (this.persistedTopics[topic]) {
            return this.isJsonString(this.storage.getItem(topic)) ? JSON.parse(this.storage.getItem(topic)) : this.storage.getItem(topic);
        } else {
            return this.isJsonString(this.session.getItem(topic)) ? JSON.parse(this.session.getItem(topic)) : this.session.getItem(topic);

        }
    }

    deleteTopic(topic) {
        if (this.persistedTopics[topic]) {
            delete this.persistedTopics[topic];
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