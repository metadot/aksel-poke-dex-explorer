import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon-list',
  imports: [HeaderComponent, CommonModule, MatPaginatorModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  types: any[] = [];
  currentPage = 0;
  limit = 0;
  offset = 0;

  constructor(private http: HttpClient) {}

  getTypes() {
    return this.http.get(`https://pokeapi.co/api/v2/type`);
  }

  getTypeData(url: string) {
    return this.http.get(`${url}`);
  }

  getPokemonSpecies(limit: number, offset: number) {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${offset}`
    );
  }

  async getPokemonInfo(limit: number = 12, offset: number = 0) {
    const typeResponse: any = await firstValueFrom(this.getTypes());
    const typePromises = typeResponse.results.map((result: any) =>
      firstValueFrom(this.getTypeData(result.url))
    );

    const speciesResponse: any = await firstValueFrom(
      this.getPokemonSpecies(limit, offset)
    );

    console.log(speciesResponse);

    const pokemonPromises = speciesResponse.results.map(
      async (species: any) => {
        const speciesData: any = await firstValueFrom(
          this.getPokemonData(species.url)
        );
        const detailedPokemon = await firstValueFrom(
          this.http.get(speciesData.varieties[0].pokemon.url)
        );
        console.log(species.name);
        return {
          species_name: species.name,
          ...detailedPokemon,
        };
      }
    );
    this.types = await Promise.all(typePromises);
    this.pokemons = await Promise.all(pokemonPromises);
    console.log(this.pokemons);
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
    this.limit = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
    this.offset = pageEvent.pageIndex * pageEvent.pageSize;
    console.log(this.limit, this.currentPage, this.offset);
    await this.getPokemonInfo(this.limit, this.offset);
    window.scrollTo(0, 0);
  }

  async ngOnInit(): Promise<void> {
    this.getPokemonInfo();
  }
}
