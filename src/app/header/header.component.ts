import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { limitParam, pageParam } from '../_core/constants/pagination.constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchText = signal('');
  limitParam: number = limitParam;
  pageParam: number = pageParam;

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
