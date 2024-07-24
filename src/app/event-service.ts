import { Injectable } from '@angular/core';
import { toConsole } from '@utilities/common-utils';
import { Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventSubject = new Subject<{ title: string, payload?: any, action?: string }>();

  constructor() { }

  emitEvent = (title: string, payload?: any, action?: string): void => {
    toConsole('EventService emitEvent title: ', title);
    toConsole('EventService emitEvent payload: ', payload);
    toConsole('EventService emitEvent action: ', action);
    this.eventSubject.next({ title, payload, action });
  }

  onEvent = (title: string) => {
    return this.eventSubject.asObservable().pipe(
      filter(event => event && event.title === title)
    );
  }
}
