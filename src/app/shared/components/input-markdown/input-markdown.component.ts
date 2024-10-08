import { Component, Input } from '@angular/core';
import { Events } from '@shared/utilities/events';
import { EventService } from 'src/app/event-service';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrl: './input-markdown.component.css'
})
export class InputMarkdownComponent {
  
  @Input()
  markdownContent: string = '';
  
  @Input()
  textAreaPlaceholder: string = 'Text';

  constructor(private eventService: EventService) {

  }

  inputTextArea = () => this.eventService.emitEvent(Events.MARKDOWN_CHANGE, this.markdownContent);

}
