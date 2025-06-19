import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, effect, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-data-view',
  imports: [CommonModule, RouterModule, PokemonCardComponent],
  templateUrl: './pokemon-detailed-view.component.html',
})
export class PokemonDetailedViewComponent {
  readonly name = input.required<string>();

  readonly currentSpecies: any = httpResource(
    () => `https://pokeapi.co/api/v2/pokemon-species/${this.name()}`
  );
  private getFirstVarietyName(species: any): string | undefined {
    return species?.varieties?.[0]?.pokemon?.name;
  }

  readonly basePokemon: any = httpResource(() => {
    const species = this.currentSpecies.value();
    const firstVarietyName = this.getFirstVarietyName(species);
    return firstVarietyName
      ? `https://pokeapi.co/api/v2/pokemon/${firstVarietyName}`
      : undefined; // or null, to skip fetch until ready
  });

  readonly currentPokemon: any = httpResource(() => {
    const name = this.selectedVarietyName();
    return `https://pokeapi.co/api/v2/pokemon/${name}`;
  });

  readonly id = computed(() => this.basePokemon.value()?.id);

  readonly previousSpecies: any = httpResource(() => {
    const id = this.id();
    return id && id > 1
      ? `https://pokeapi.co/api/v2/pokemon-species/${id - 1}`
      : undefined;
  });

  readonly previousPokemon: any = httpResource(() => {
    const id = this.id();
    return id && id > 1
      ? `https://pokeapi.co/api/v2/pokemon/${id - 1}`
      : undefined;
  });

  readonly nextSpecies: any = httpResource(() => {
    const id = this.id();
    return id && id < 1025
      ? `https://pokeapi.co/api/v2/pokemon-species/${id + 1}`
      : undefined;
  });

  readonly nextPokemon: any = httpResource(() => {
    const id = this.id();
    return id && id < 1025
      ? `https://pokeapi.co/api/v2/pokemon/${id + 1}`
      : undefined;
  });

  readonly latestCry = computed(
    () => this.currentPokemon.value()?.cries.latest
  );
  readonly legacyCry = computed(
    () => this.currentPokemon.value()?.cries.legacy
  );

  readonly latestFlavorText: any = computed(() => {
    const entries = this.currentSpecies.value()?.flavor_text_entries;

    if (!entries) return null;

    const englishEntries = entries.filter(
      (entry: any) => entry.language.name === 'en'
    );

    return englishEntries[englishEntries.length - 1] ?? null;
  });

  readonly error = signal(false);

  convertHeight(height: number) {
    const inchesTotal = height * 3.93701;
    const feet = Math.floor(inchesTotal / 12);
    const inches = parseFloat((inchesTotal % 12).toFixed(0));
    return `${feet}' ${inches}"`;
  }

  convertWeight(weight: number) {
    return `${parseFloat((weight * 0.220462).toFixed(1))} lbs`;
  }

  selectedVarietyName = signal('');

  onFormSelected(name: string) {
    this.selectedVarietyName.set(name);
  }

  constructor() {
    effect(() => {
      const species = this.currentSpecies.value();
      if (!species) return;
      const firstVarietyName = this.getFirstVarietyName(species);
      if (!firstVarietyName) return;
      this.selectedVarietyName.set(firstVarietyName);
    });
  }
}
