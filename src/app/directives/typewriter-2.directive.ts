import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTypewriter2]'
})
export class Typewriter2Directive implements AfterViewInit {
  @Input() appTypewriter2: string[] = []; // Custom text array
  private currentIndex: number = 0;
  private charIndex: number = 0;
  private isTyping: boolean = true;
  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    this.type();
  }
  
  private type(): void {
    const inputElement: HTMLInputElement = this.elementRef.nativeElement;
    const placeholder = inputElement.placeholder || '';

    if (this.currentIndex >= this.appTypewriter2.length) {
      this.currentIndex = 0;
    }

    const currentText = this.appTypewriter2[this.currentIndex];

    if (this.isTyping) {
      inputElement.placeholder = placeholder + currentText[this.charIndex];
      this.charIndex++;

      if (this.charIndex < currentText.length) {
        setTimeout(() => this.type(), 100); // Adjust typing speed here (in milliseconds)
      } else {
        this.isTyping = false;
        setTimeout(() => this.type(), 1000); // Adjust delay after typing here (in milliseconds)
      }
    } else {
      inputElement.placeholder = inputElement.placeholder.substring(0, this.charIndex);
      this.charIndex--;

      if (this.charIndex >= 0) {
        setTimeout(() => this.type(), 100); // Adjust erasing speed here (in milliseconds)
      } else {
        this.isTyping = true;
        this.charIndex = 0;
        this.currentIndex++;
        setTimeout(() => this.type(), 1000); // Adjust delay between strings here (in milliseconds)
      }
    }
  }
}

