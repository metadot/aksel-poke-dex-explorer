import { httpResource, HttpResourceRef } from '@angular/common/http';
import {
  Component,
  computed,
  input,
  linkedSignal,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import {
  LIMIT_PAGE,
  DEFAULT_PAGE,
  PAGE_SIZE_OPTIONS,
  POKEMON_NUMBER,
} from '../_core/constants/pagination.constants';
import { PokemonSpeciesList } from '../_core/models/pokemon';
import { PokemonErrorComponent } from '../pokemon-error/pokemon-error.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, MatPaginatorModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  readonly page = input<number>(DEFAULT_PAGE);
  readonly limit = input<number>(LIMIT_PAGE);
  POKEMON_NUMBER: number = POKEMON_NUMBER;
  PAGE_SIZE_OPTIONS: number[] = PAGE_SIZE_OPTIONS;

  readonly offset: Signal<number> = computed(() => this.page() * this.limit());

  readonly allPokemons: HttpResourceRef<PokemonSpeciesList | undefined> =
    httpResource(() => ({
      url: `https://pokeapi.co/api/v2/pokemon-species`,
      params: {
        limit: this.limit(),
        offset: this.offset(),
      },
    }));

  searchText = signal<string>('');

  constructor(private router: Router) {}

  onSearchInputChanged(value: string) {
    this.searchText.set(value);
  }

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
