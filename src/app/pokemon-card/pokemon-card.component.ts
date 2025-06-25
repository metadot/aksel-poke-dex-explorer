import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
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
  readonly pokemon = input.required<Pokemon | undefined>();
  readonly basePokemon = input.required<Pokemon | undefined>();
  readonly pokemonSpecies = input.required<PokemonSpecies | undefined>();
  readonly speciesError = input.required<unknown>();
  readonly previousSpecies = input<PokemonSpecies | undefined>();
  readonly previousPokemon = input<Pokemon | undefined>();
  readonly nextSpecies = input<PokemonSpecies | undefined>();
  readonly nextPokemon = input<Pokemon | undefined>();
  readonly flavorText = input<string>();
  readonly latestCry = input<string>();
  readonly legacyCry = input<string>();
  readonly weight = input<string>();
  readonly height = input<string>();

  selectedForm = input.required<string | undefined>();
  formSelected = output<string>();

  onFormChange(value: string) {
    this.formSelected.emit(value);
  }
}
