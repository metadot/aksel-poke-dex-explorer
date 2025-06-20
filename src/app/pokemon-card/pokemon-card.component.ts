import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pokemon, PokemonSpecies } from '../_core/models/pokemon';
import { HttpResourceRef } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  readonly pokemon = input.required<HttpResourceRef<Pokemon | undefined>>();
  readonly basePokemon = input.required<HttpResourceRef<Pokemon | undefined>>();
  readonly pokemonSpecies =
    input.required<HttpResourceRef<PokemonSpecies | undefined>>();
  readonly previousSpecies =
    input<HttpResourceRef<PokemonSpecies | undefined>>();
  readonly previousPokemon = input<HttpResourceRef<Pokemon | undefined>>();
  readonly nextSpecies = input<HttpResourceRef<PokemonSpecies | undefined>>();
  readonly nextPokemon = input<HttpResourceRef<Pokemon | undefined>>();
  readonly flavorText = input<string>();
  readonly latestCry = input<string>();
  readonly legacyCry = input<string>();
  readonly weight = input<string>();
  readonly height = input<string>();

  selectedForm = input.required<string | undefined>();
  formSelected = output<string>();

  onFormChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.formSelected.emit(value);
  }
}
