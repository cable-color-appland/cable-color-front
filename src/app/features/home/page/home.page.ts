import { Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public menu = environment.menu;

  constructor(private readonly renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#ffffff');
  }
}
