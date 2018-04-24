/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2018-04-24 22:55:30 
 * @Last Modified by:   Rajkeshwar Prasad 
 * @Last Modified time: 2018-04-24 22:55:30 
 */

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

//http://blog.lacolaco.net/post/event-broadcasting-in-angular-2/
interface BroadcastEvent {
    key: any;
    data?: any;
}

export class Broadcaster {
    private _eventBus: Subject<BroadcastEvent>;

    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    broadcast(key: any, data?: any) {
        this._eventBus.next({ key, data });
    }

    on<T>(key: any): Observable<T> {
        return this._eventBus.asObservable()
            .filter(event => event.key === key)
            .map(event => <T>event.data);
    }
}