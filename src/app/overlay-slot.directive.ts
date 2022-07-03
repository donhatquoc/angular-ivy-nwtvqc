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
    console.log(value);
    if (!value.totalTime) return;
    const totalTime = value.totalTime;
    const widthTotalPos = this.elementRef.nativeElement.offsetWidth;
    const scale = 72 / (24 * 3600);

    value.booking.order.forEach((order) => {
      // take a look caculate the translation x value
      // caculate the with of the book related to time range
      const timeDuring =
        moment(order.end_tine).unix() - moment(order.start_time).unix();
      const posStart =
        moment(order.start_time).unix() - moment(value.start).unix();
      console.log(moment(order.start_time).format('YYYY-MM-DD HH:mm:ss'));
      const ran = posStart * scale;
      const ranWidth = timeDuring * scale;
      // console.log(ranWidth);
      const child = this.document.createElement('div');
      child.className = 'overlay-slot';
      // child.style.transform = `translateX(${ran}px)`;

      const cssText = `width: ${ranWidth}px; transform: translateX(${ran}px);`;
      child.style.cssText = cssText;
      this.renderer.appendChild(this.elementRef.nativeElement, child);
    });

    // console.log(value);
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
