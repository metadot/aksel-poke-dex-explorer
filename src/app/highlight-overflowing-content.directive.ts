import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightOverflowingContent]',
})
export class HighlightOverflowingContentDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngAfterViewInit() {
    this.checkOverflow();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkOverflow();
  }

  private checkOverflow(): void {
    if (this.el.nativeElement.clientWidth < this.el.nativeElement.scrollWidth) {
      this.renderer.setStyle(this.el.nativeElement, 'background', 'red');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background');
    }
  }
}
