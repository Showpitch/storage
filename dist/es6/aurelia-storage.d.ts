declare module 'aurelia-storage' {
  
  /**
   * Created by ericjohnson on 10/6/15.
   */
  import 'moment';
  export class Storage {
    constructor();
    loadIndex(): any;
    store(key: any, value: any, expiration?: any, session?: any): any;
    retrieve(key: any): any;
    remove(key: any): any;
    saveTopic(topic: any, value: any, isLocal?: any): any;
    retrieveTopic(topic: any): any;
    deleteTopic(topic: any): any;
    isJsonString(str: any): any;
  }
}