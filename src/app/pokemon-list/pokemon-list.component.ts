import { httpResource } from '@angular/common/http';
import { Component, computed, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import {
  limitParam,
  pageParam,
  pageSizeOptions,
  pokemonNumber,
} from '../_core/constants/pagination.constants';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, MatPaginatorModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  readonly page = input<number>(pageParam);
  readonly limit = input<number>(limitParam);
  pokemonNumber = pokemonNumber;
  pageSizeOptions = pageSizeOptions;

  readonly offset = computed(() => this.page() * this.limit());

  readonly pokemons = httpResource<any>(() => ({
    url: `https://pokeapi.co/api/v2/pokemon-species`,
    params: {
      limit: this.limit(),
      offset: this.offset(),
    },
  }));

  constructor(private router: Router) {
    effect(() => {
      console.log(`This is the page ${this.page()}`);
      console.log(`This is the number of items per page ${this.limit()}`);
    });
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
