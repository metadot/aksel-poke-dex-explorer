import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonDisplayComponent } from './pokemon-display/pokemon-display.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'display', component: PokemonDisplayComponent },
];
