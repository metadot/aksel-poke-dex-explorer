import { Routes, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDataViewComponent } from './pokemon-data-view/pokemon-data-view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemons', component: PokemonListComponent },
  {
    path: 'pokemon/:name',
    component: PokemonDataViewComponent,
  },
];
