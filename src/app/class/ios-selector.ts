

// import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit } from '@angular/core';

// interface IosSelectorOptions {
//   type: string;
//   count: number;
//   sensitivity: number;
//   source: Array<{ value: any, text: string }>;
//   value: any;
//   onChange: any;
// }

// @Directive({
//   selector: '[appIosSelector]'
// })
// export class IosSelectorDirective implements OnInit {
//   @Input('appIosSelector') options: IosSelectorOptions;
//   halfCount: number;
//   quarterCount: number;
//   a: number;
//   minV: number;
//   selected: { value: any, text: string };
//   exceedA: number;
//   moveT: number;
//   moving: boolean;
//   itemHeight: number;
//   itemAngle: number;
//   radius: number;
//   scroll: number;
//   elems: any;

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   ngOnInit() {
//     let defaults: IosSelectorOptions = {
//       type: "infinite",
//       count: 20,
//       sensitivity: 0.8,
//       source: [],
//       value: null,
//       onChange: null,
//     };

//     this.options = Object.assign({}, defaults, this.options);
//     this.options.count = this.options.count - (this.options.count % 4);
//     Object.assign(this, this.options);

//     this.halfCount = this.options.count / 2;
//     this.quarterCount = this.options.count / 4;
//     this.a = this.options.sensitivity * 10;
//     this.minV = Math.sqrt(1 / this.a);
//     this.selected = this.source[0];
//     this.exceedA = 10;
//     this.moveT = 0;
//     this.moving = false;
//     this.elems = {
//       el: this.el.nativeElement,
//       circleList: null,
//       circleItems: null,

//       highlight: null,
//       highlightList: null,
//       highListItems: null,
//     };

//     this.itemHeight = (this.elems.el.offsetHeight * 3) / this.options.count;
//     this.itemAngle = 360 / this.options.count;
//     this.radius = this.itemHeight / Math.tan((this.itemAngle * Math.PI) / 180);
//     this.scroll = 0;
//   }

//   @HostListener('touchstart', ['$event'])
//   onTouchStart(event: any) {
//     // your touchstart logic here
//   }

//   @HostListener('touchmove', ['$event'])
//   onTouchMove(event: any) {
//     // your touchmove logic here
//   }

//   @HostListener('touchend', ['$event'])
//   onTouchEnd(event: any) {
//     // your touchend logic here
//   }
// }