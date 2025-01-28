import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from '@shared/animations';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [fadeAnimation],
})
export class HomePage implements OnInit {
  public menu = environment.menu;
  isSidenavOpened = true;

  constructor(
    private readonly renderer: Renderer2,
    private readonly sessionService: SessionService
  ) {}
  ngOnInit(): void {
    this.updateMenu(
      this.menu,
      this.sessionService.getUserField('Modules').split(',')
    );
    this.renderer.setStyle(document.body, 'background-color', '#ffffff');
    if (window.innerWidth <= 768) {
      this.isSidenavOpened = false;
    }
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
    this.sessionService.logout();
  }

  updateMenu(menu: any[], moduleRoleResponse: string[]) {
    console.log(moduleRoleResponse);
    const moduleNames = new Set(moduleRoleResponse);

    menu.forEach((menuItem) => {
      const hasAccess = moduleNames.has(menuItem.module);
      menuItem.enabled = hasAccess;

      if (menuItem.children && menuItem.children.length > 0) {
        menuItem.children.forEach((childItem: any) => {
          childItem.enabled = moduleNames.has(childItem.module);
        });

        if (
          !hasAccess &&
          menuItem.children.some((child: any) => child.enabled)
        ) {
          menuItem.enabled = true;
        }
      }
    });

    const newMenu = menu
      .filter((element) => element.enabled)
      .map((element) => {
        if (element.children) {
          element.children = element.children.filter(
            (child: any) => child.enabled
          );
        }
        return element;
      });

    this.menu = newMenu;
  }
}
