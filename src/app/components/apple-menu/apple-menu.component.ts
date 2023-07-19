import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
// import { IosSelector, SelectorOption } from '../../class/ios-selector';
import * as Hammer from 'hammerjs';


const easing = {
  easeOutCubic: (pos: number) =>{
    return Math.pow((pos - 1), 3) + 1;
  },
  easeOutQuart: (pos: number)=> {
    return -(Math.pow((pos - 1), 4) - 1);
  },
};



@Component({
  selector: 'app-apple-menu',
  templateUrl: './apple-menu.component.html',
  styleUrls: ['./apple-menu.component.scss'],
})
export class AppleMenuComponent implements OnInit {
  // private iosSelector!: IosSelector;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const options = {
      el: this.elementRef.nativeElement.querySelector('.date-selector'),
      // Add other options as needed
    };

    // this.iosSelector = new IosSelector(options);
  }

}
