import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import moment from 'moment';

@Directive({ selector: '[appRender]' })
export class OverlaySlotDirective implements AfterViewInit {
  @Input()
  set range(value) {
    console.log(this.elementRef.nativeElement.offsetWidth);
    const totalTime = value.totalTime;
    const widthTotal = this.elementRef.nativeElement.offsetWidth - 70;
    const widthTotalPos = this.elementRef.nativeElement.offsetWidth;
    const scale = widthTotal / totalTime;
    value.booking.order.forEach((order) => {
      // take a look caculate the translation x value
      // caculate the with of the book related to time range
      const timeDuring =
        moment(order.end_tine).unix() - moment(order.start_time).unix();
      const posStart =
        moment(order.start_time).unix() - moment(value.start).unix();
      const ran = (posStart * widthTotalPos) / totalTime;
      const ranWidth = (timeDuring * 72) / (24 * 3600);
      const child = this.document.createElement('div');
      child.className = 'overlay-slot';
      // child.style.transform = `translateX(${ran}px)`;

      const cssText = `width: ${ranWidth}px; transform: translateX(${ran}px);`;
      child.style.cssText = cssText;
      this.renderer.appendChild(this.elementRef.nativeElement, child);
    });

    console.log(value);
  }
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngAfterViewInit(): void {
    // console.log(this.elementRef.nativeElement.offsetWidth);
  }
}
