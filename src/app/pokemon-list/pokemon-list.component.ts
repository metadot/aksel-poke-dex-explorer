import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, first, firstValueFrom } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, MatPaginatorModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  readonly page = input<number>(0);
  readonly limit = input<number>(12);

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

  async handlePageEvent(pageEvent: PageEvent) {
    this.router.navigate([], {
      queryParams: {
        limit: pageEvent.pageSize,
        page: pageEvent.pageIndex,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
