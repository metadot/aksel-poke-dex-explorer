import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { limitParam, pageParam } from '../_core/constants/pagination.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchTerm = '';

  constructor(private router: Router) {}

  onSearch() {
    const trimmed = this.searchTerm.trim().toLowerCase();
    if (trimmed) {
      this.router.navigate(['/pokemon', trimmed]);
    }
  }
  limitParam = limitParam;
  pageParam = pageParam;
}
