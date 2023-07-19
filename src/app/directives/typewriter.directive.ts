import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appTypewriter]',
})
export class TypewriterDirective implements AfterViewInit {
  @Input() appTypewriter: string = ''; // Custom text
  @Output() endWritting = new EventEmitter<boolean>();

  private charIndex: number = 0;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // this.appTypewriter = this.appTypewriter.replace(/\n/g, " <br> ");
    this.type();
  }

  private type(): void {
    const typewriter: HTMLElement = this.elementRef.nativeElement;
    typewriter.innerHTML += this.appTypewriter[this.charIndex];
    if (this.appTypewriter[this.charIndex] === '\n') {
      typewriter.innerHTML += '<br>';
    }
    this.charIndex++;

    if (this.charIndex < this.appTypewriter.length) {
      setTimeout(() => this.type(), 25); // Adjust typing speed here (in milliseconds)
    }
    if (this.charIndex >= this.appTypewriter.length) {
      this.endWritting.emit(true);
    }
  }
}
