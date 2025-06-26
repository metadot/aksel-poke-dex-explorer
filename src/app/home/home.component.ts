import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LIMIT_PAGE,
  DEFAULT_PAGE,
} from '../_core/constants/pagination.constants';
@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly LIMIT_PAGE: number = LIMIT_PAGE;
  readonly DEFAULT_PAGE: number = DEFAULT_PAGE;
}
