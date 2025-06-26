import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  LIMIT_PAGE,
  DEFAULT_PAGE,
} from '../_core/constants/pagination.constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchText = signal('');
  readonly LIMIT_PAGE: number = LIMIT_PAGE;
  readonly DEFAULT_PAGE: number = DEFAULT_PAGE;

  constructor(private router: Router) {}

  onSearchInputChanged(value: string) {
    this.searchText.set(value);

    this.router.navigate(['/pokemons'], {
      queryParams: { search: value || null, page: 0, limit: 12 },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
