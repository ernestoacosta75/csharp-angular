import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventSubject = new Subject<{ title: string, payload?: any, action?: string }>();

  constructor() { }

  emitEvent = (title: string, payload?: any, action?: string): void => {
    this.eventSubject.next({ title, payload, action });
  }

  onEvent = (title: string) => {
    return this.eventSubject.asObservable().pipe(
      filter(event => event && event.title === title)
    );
  }
}
