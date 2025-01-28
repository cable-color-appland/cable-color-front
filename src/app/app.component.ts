import { Component } from '@angular/core';
import { fadeAnimation } from '@shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation],
})
export class AppComponent {
  title = 'Front-Cable-color';
}
