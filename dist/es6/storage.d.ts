declare module 'storage' {
  
  /**
   * Created by ericjohnson on 10/6/15.
   */
  import moment from 'moment';
  export class Storage {
    constructor();
    loadIndex(): any;
    store(key: any, value: any, session?: any, expiration?: any): any;
    retrieve(key: any): any;
    remove(key: any): any;
    isJsonString(str: any): any;
  }
}