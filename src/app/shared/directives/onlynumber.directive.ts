import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[onlyNumber]'
})
// tslint:disable-next-line:directive-class-suffix
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: any) {
    const e = <KeyboardEvent>event;
    if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }

  }

  @HostListener('contextmenu', ['$event'])
  onMouseRightClick(event) {
    if (event.which === 3) {
      const e = <MouseEvent>event;
      e.preventDefault();
    }
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
