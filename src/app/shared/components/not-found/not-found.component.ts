import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundCongif } from './not-found.config';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  public config = NotFoundCongif;
  constructor(private readonly router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
