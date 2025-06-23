import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Component, computed, effect, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import {
  limitParam,
  pageParam,
  pageSizeOptions,
  pokemonNumber,
} from '../_core/constants/pagination.constants';
import { PokemonSpeciesList } from '../_core/models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, MatPaginatorModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  readonly page = input<number>(pageParam);
  readonly limit = input<number>(limitParam);
  pokemonNumber: number = pokemonNumber;
  pageSizeOptions: number[] = pageSizeOptions;

  readonly offset: Signal<number> = computed(() => this.page() * this.limit());

  readonly allPokemons: HttpResourceRef<PokemonSpeciesList | undefined> =
    httpResource(() => ({
      url: `https://pokeapi.co/api/v2/pokemon-species`,
      params: {
        limit: pokemonNumber,
      },
    }));

  readonly pokemons = computed(() => {
    const all = this.allPokemons.value();
    const offset = this.offset();
    const limit = Number(this.limit());

    return {
      ...all,
      results: all?.results.slice(offset, offset + limit),
    };
  });

  constructor(private router: Router) {}

  onPageChanged(pageEvent: PageEvent) {
    this.router.navigate([], {
      queryParams: {
        limit: pageEvent.pageSize,
        page: pageEvent.pageIndex,
      },
      queryParamsHandling: 'merge',
    });
  }
}
