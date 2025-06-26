import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  LIMIT_PAGE,
  DEFAULT_PAGE,
} from '../_core/constants/pagination.constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor() {}
  readonly LIMIT_PAGE: number = LIMIT_PAGE;
  readonly DEFAULT_PAGE: number = DEFAULT_PAGE;
}
