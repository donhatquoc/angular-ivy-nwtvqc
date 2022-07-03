import {
  Component,
  VERSION,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  // @ViewChild('el') el: any;
  @ViewChild('el', { static: true }) el: ElementRef;
  name = 'Angular ' + VERSION.major;
  calendar = [];
  maxScrollLeft = 0;
  totalTime = 4;

  booking_order = [
    {
      group_id: 'NC-0012',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-20T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0013',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0014',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-0016',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-0012',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-0015',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-004',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-003',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0015',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-0016',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-0012',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-0015',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-004',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-003',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
      ],
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {
    const startWeek = moment().startOf('month');
    const endWeek = moment().endOf('month');

    const diffDate = endWeek.diff(startWeek, 'days');
    console.log(startWeek);
    let calendar = [startWeek];
    for (var week = 0; week < diffDate; week++) {
      calendar.push(moment(startWeek).add(week + 1, 'day'));
    }
    this.calendar = calendar;

    console.log(moment(this.calendar[0]).unix());
    console.log(this.calendar);
  }

  onScroll(el: Event) {
    if (
      this.el.nativeElement.scrollLeft ===
      this.el.nativeElement.scrollWidth - this.el.nativeElement.clientWidth
    ) {
      let lastElement = this.calendar.slice(-1);
      for (var week = 0; week < 10; week++) {
        this.calendar.push(moment(lastElement[0]).add(week + 1, 'day'));
      }
    }
  }

  ngAfterViewInit() {
    this.totalTime =
      moment(this.calendar.slice(-1)[0]).unix() -
      moment(this.calendar[0]).unix();
    // this.scaleTotal =
    this.cdr.detectChanges();
  }
}
