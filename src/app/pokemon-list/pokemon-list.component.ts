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

  readonly page = input.required<number>();
  readonly limit = input.required<number>();

  constructor(private http: HttpClient, private router: Router) {
    effect(() => {
      console.log(`This is the page ${this.page()}`);
      console.log(`This is the number of items per page ${this.limit()}`);
      this.getPokemonInfo();
    });
  }

  getTypes() {
    return this.http.get(`https://pokeapi.co/api/v2/type`);
  }

  getTypeData(url: string) {
    return this.http.get(`${url}`);
  }

  getPokemonSpecies(offset: number) {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon-species?limit=${this.limit()}&offset=${offset}`
    );
  }

  async getPokemonInfo() {
    const offset = this.limit() * this.page();
    const typeResponse: any = await firstValueFrom(this.getTypes());
    const typePromises = typeResponse.results.map((result: any) =>
      firstValueFrom(this.getTypeData(result.url))
    );

    const speciesResponse: any = await firstValueFrom(
      this.getPokemonSpecies(offset)
    );

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
