import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[modalCloser]'
})
export class ModalCloserDirective {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  private showPopover = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (clickedInside && !this.showPopover) {
      console.log('Opennnnnn');
      
      this.showPopover = true;
    } else if (!clickedInside && this.showPopover) {
      console.log('Closeeeeeee');
      this.showPopover = false;
      this.closeModal.emit();
    }
  }
}
