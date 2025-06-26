import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pokemon, PokemonSpecies } from '../_core/models/pokemon';
import { HttpResourceRef } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  readonly pokemon = input.required<Pokemon>();
  readonly basePokemon = input.required<Pokemon>();
  readonly pokemonSpecies = input.required<PokemonSpecies>();
  readonly previousSpecies = input<PokemonSpecies | undefined>();
  readonly previousPokemon = input<Pokemon | undefined>();
  readonly nextSpecies = input<PokemonSpecies | undefined>();
  readonly nextPokemon = input<Pokemon | undefined>();
  readonly flavorText = input<string>();
  readonly latestCry = input<string>();
  readonly legacyCry = input<string>();
  readonly weight = input<string>();
  readonly height = input<string>();

  selectedForm = input.required<string>();
  formSelected = output<string>();

  onFormChange(value: string) {
    this.formSelected.emit(value);
  }
}
