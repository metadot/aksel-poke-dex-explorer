import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PokemonGridComponent } from '../pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'app-pokemon-display',
  imports: [HeaderComponent, PokemonGridComponent],
  templateUrl: './pokemon-display.component.html',
  styleUrl: './pokemon-display.component.css',
})
export class PokemonDisplayComponent {}
