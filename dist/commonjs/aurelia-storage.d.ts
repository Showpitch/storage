declare module 'aurelia-storage' {
  
  /**
   * Created by ericjohnson on 10/6/15.
   */
  export class Storage {
    constructor();
    getPersistedTopics(): any;
    saveTopic(topic: any, value: any, isLocal?: any): any;
    retrieveTopic(topic: any): any;
    deleteTopic(topic: any): any;
  }
}