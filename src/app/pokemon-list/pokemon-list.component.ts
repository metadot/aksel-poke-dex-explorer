import { HttpClient, httpResource } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { first, firstValueFrom } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, MatPaginatorModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  pokemons: any[] = [];
  types: any[] = [];

  readonly limit = input<number>();
  readonly page = input<number>();

  currentPage = signal(0);
  pageSize = signal(12);
  offset = computed(() => this.currentPage() * this.pageSize());

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    effect(() => {
      this.currentPage.set(this.page() ?? 0);
      this.pageSize.set(this.limit() ?? 12);
      this.getPokemonInfo();
    });
  }

  getTypes() {
    return this.http.get(`https://pokeapi.co/api/v2/type`);
  }

  getTypeData(url: string) {
    return this.http.get(`${url}`);
  }

  getPokemonSpecies() {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon-species?limit=${this.limit()}&offset=${this.offset()}`
    );
  }

  async getPokemonInfo() {
    const typeResponse: any = await firstValueFrom(this.getTypes());
    const typePromises = typeResponse.results.map((result: any) =>
      firstValueFrom(this.getTypeData(result.url))
    );

    const speciesResponse: any = await firstValueFrom(this.getPokemonSpecies());

    const pokemonPromises = speciesResponse.results.map(
      async (species: any) => {
        const speciesData: any = await firstValueFrom(
          this.getPokemonData(species.url)
        );
        const detailedPokemon = await firstValueFrom(
          this.http.get(speciesData.varieties[0].pokemon.url)
        );
        return {
          species_name: species.name,
          ...detailedPokemon,
        };
      }
    );
    this.types = await Promise.all(typePromises);
    this.pokemons = await Promise.all(pokemonPromises);
  }

  getPokemonData(url: string) {
    return this.http.get(url);
  }

  getTypeId(typeName: string) {
    const match = this.types.find((t) => t.name === typeName);
    return match ? match.id : null;
  }

  getTypeSprite(typeName: string) {
    const typeId = this.getTypeId(typeName);

    const type = this.types[typeId - 1];
    return type.sprites['generation-ix']['scarlet-violet']['name_icon'];
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
