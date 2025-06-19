import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  readonly pokemon = input.required<any>();
  readonly basePokemon = input.required<any>();
  readonly pokemonSpecies = input.required<any>();
  readonly previousSpecies = input<any>();
  readonly previousPokemon = input<any>();
  readonly nextSpecies = input<any>();
  readonly nextPokemon = input<any>();
  readonly flavorText = input<string>();
  readonly latestCry = input<string>();
  readonly legacyCry = input<string>();
  readonly weight = input<string>();
  readonly height = input<string>();

  selectedForm = input.required<string>();
  formSelected = output<string>();

  onFormChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.formSelected.emit(value);
  }
}
