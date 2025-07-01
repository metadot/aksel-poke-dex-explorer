import { Directive, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightLegendaryPokemon]',
})
export class HighlightLegendaryPokemonDirective {
  readonly appHighlightLegendaryPokemon = input<boolean>();
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const isLegendary = this.appHighlightLegendaryPokemon();
    if (isLegendary) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'boxShadow',
        '0 0 15px 5px gold'
      );
      this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '15px');
      this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
    }
  }
}
