import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { limitParam, pageParam } from '../_core/constants/pagination.constants';
@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  limitParam: number = limitParam;
  pageParam: number = pageParam;
}
