import { Component, Input } from '@angular/core';
import { Events } from '@utilities/events';
import { EventService } from 'src/app/event-service';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrl: './input-markdown.component.css'
})
export class InputMarkdownComponent {
  
  @Input()
  markdownContent: string = '';

  constructor(private eventService: EventService) {

  }

  inputTextArea = (aText: string) => {
    this.markdownContent = aText;
    this.eventService.emitEvent(Events.MARKDOWN_CHANGE, aText);
  };
}
