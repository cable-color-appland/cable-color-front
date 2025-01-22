import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public menu = environment.menu;
  isSidenavOpened = true;

  constructor(
    private readonly renderer: Renderer2,
    private readonly autService: AuthService
  ) {}
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#ffffff');
  }

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
  logout(): void {
    this.renderer.setStyle(
      document.body,
      'background-color',
      'var(--primary-color)'
    );
    this.autService.logout();
  }
}
