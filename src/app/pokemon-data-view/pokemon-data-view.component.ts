import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-data-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-data-view.component.html',
  styleUrl: './pokemon-data-view.component.css',
})
export class PokemonDataViewComponent {
  readonly name = input.required<string>();
  readonly currentPokemon: any = httpResource(
    () => `https://pokeapi.co/api/v2/pokemon/${this.name()}`
  );
  readonly currentSpecies: any = httpResource(
    () => `https://pokeapi.co/api/v2/pokemon-species/${this.name()}`
  );
  readonly id = computed(() => this.currentPokemon.value()?.id);

  readonly previousPokemon: any = httpResource(() => {
    const id = this.id();
    return id && id > 1
      ? `https://pokeapi.co/api/v2/pokemon/${id - 1}`
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
    return `Height: ${feet}' ${inches}"`;
  }

  convertWeight(weight: number) {
    return `Weight: ${parseFloat((weight * 0.220462).toFixed(1))} lbs`;
  }
}
