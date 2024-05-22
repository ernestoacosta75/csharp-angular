import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import * as R from 'ramda';

@Directive({
  selector: '[appAddRequired]'
})
export class AddRequiredDirective implements OnInit {

  @HostBinding('class.asterisk_input')
  addAsterisk: boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const hasRequiredAttr = R.pipe(
      R.path(['elementRef', 'nativeElement', 'required']),
      Boolean
    ); 
    
    this.addAsterisk = hasRequiredAttr(this.elementRef);
  }

}
