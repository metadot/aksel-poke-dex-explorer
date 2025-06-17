import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { limitParam, pageParam } from '../_core/constants/pagination.constants';
@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  limitParam = limitParam;
  pageParam = pageParam;
}
