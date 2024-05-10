import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventSubject = new Subject<{ title: string, payload?: any }>();

  constructor() { }

  emitEvent = (title: string, payload?: any): void => {
    this.eventSubject.next({ title, payload });
  }

  onEvent = (title: string) => {
    return this.eventSubject.asObservable().pipe(
      filter(event => event.title === title)
    );
  }
}
