import { CommonModule } from '@angular/common';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import {
  Component,
  computed,
  input,
  linkedSignal,
  Signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import {
  NamedAPIResource,
  Pokemon,
  PokemonSpecies,
} from '../_core/models/pokemon';
import { PokemonErrorComponent } from '../pokemon-error/pokemon-error.component';

@Component({
  selector: 'app-pokemon-data-view',
  imports: [
    CommonModule,
    RouterModule,
    PokemonCardComponent,
    PokemonErrorComponent,
  ],
  templateUrl: './pokemon-detailed-view.component.html',
})
export class PokemonDetailedViewComponent {
  readonly name = input.required<string>();

  readonly currentSpecies: HttpResourceRef<PokemonSpecies | undefined> =
    httpResource(
      () => `https://pokeapi.co/api/v2/pokemon-species/${this.name()}`
    );

  readonly basePokemon: HttpResourceRef<Pokemon | undefined> = httpResource(
    () => {
      const species = this.currentSpecies.value();
      const firstVarietyName = this.getFirstVarietyName(species);
      return firstVarietyName
        ? `https://pokeapi.co/api/v2/pokemon/${firstVarietyName}`
        : undefined;
    }
  );

  readonly currentPokemon: HttpResourceRef<Pokemon | undefined> = httpResource(
    () => {
      const name = this.selectedVarietyName();
      return `https://pokeapi.co/api/v2/pokemon/${name}`;
    }
  );

  // id needed to prevent app to fetch pokemons that don't exist (id < 1 or id > 1025)
  readonly id: Signal<number | undefined> = computed(
    () => this.basePokemon.value()?.id
  );

  readonly previousSpecies: HttpResourceRef<PokemonSpecies | undefined> =
    httpResource(() => {
      const id = this.id();
      return id && id > 1 // checking that id > 1 => id-1 >= 1 therefore the pokemon exists
        ? `https://pokeapi.co/api/v2/pokemon-species/${id - 1}`
        : undefined;
    });

  readonly previousPokemon: HttpResourceRef<Pokemon | undefined> = httpResource(
    () => {
      const id = this.id();
      return id && id > 1
        ? `https://pokeapi.co/api/v2/pokemon/${id - 1}`
        : undefined;
    }
  );

  readonly nextSpecies: HttpResourceRef<PokemonSpecies | undefined> =
    httpResource(() => {
      const id = this.id();
      return id && id < 1025 // same as previously but to verify that there is a next pokemon (id + 1 < 1025)
        ? `https://pokeapi.co/api/v2/pokemon-species/${id + 1}`
        : undefined;
    });

  readonly nextPokemon: HttpResourceRef<Pokemon | undefined> = httpResource(
    () => {
      const id = this.id();
      return id && id < 1025
        ? `https://pokeapi.co/api/v2/pokemon/${id + 1}`
        : undefined;
    }
  );

  readonly latestCry: Signal<string | undefined> = computed(
    () => this.currentPokemon.value()?.cries?.latest
  );
  readonly legacyCry: Signal<string | undefined> = computed(
    () => this.currentPokemon.value()?.cries?.legacy
  );

  readonly latestFlavorText: Signal<{
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  } | null> = computed(() => {
    const entries = this.currentSpecies.value()?.flavor_text_entries;

    if (!entries) return null;

    const englishEntries = entries.filter(
      (entry) => entry.language.name === 'en'
    );

    return englishEntries[englishEntries.length - 1] ?? null;
  });

  readonly selectedVarietyName = linkedSignal(() => {
    const species = this.currentSpecies.value();
    return this.getFirstVarietyName(species) ?? '';
  });

  private getFirstVarietyName(
    species: PokemonSpecies | undefined
  ): string | undefined {
    return species?.varieties?.[0]?.pokemon?.name;
  }

  convertHeight(height: number): string {
    const inchesTotal = height * 3.93701;
    const feet = Math.floor(inchesTotal / 12);
    const inches = parseFloat((inchesTotal % 12).toFixed(0));
    return `${feet}' ${inches}"`;
  }

  convertWeight(weight: number): string {
    return `${parseFloat((weight * 0.220462).toFixed(1))} lbs`;
  }

  onFormSelected(name: string): void {
    this.selectedVarietyName.set(name);
  }
}
