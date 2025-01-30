export const environment = {
  production: true,
  apiUrl:
    'https://back-cable-color-c6ctgcadengrgnes.canadacentral-01.azurewebsites.net/api',
  cacheDuration: 28800000,
  menu: [
    {
      text: 'Inicio',
      subText: 'Inicio',
      icon: 'house',
      routerLink: 'home',
      module: 'inicio',
    },
    {
      text: 'Seguridad',
      subText: 'Gestión de seguridad',
      icon: 'admin_panel_settings',
      module: 'Seguridad',
      enabled: true,
      children: [
        {
          text: 'Países',
          icon: 'flag',
          module: 'Country',
          enabled: true,
        },
        {
          text: 'Regiones',
          icon: 'signpost',
          module: 'Region',
          enabled: true,
        },
      ],
    },
    {
      text: 'Accesibilidad',
      subText: 'Gestión de seguridad',
      icon: 'account_box',
      module: 'Accesibilidad',
      enabled: true,
      children: [
        {
          text: 'Usuarios',
          icon: 'group',
          module: 'User',
          enabled: true,
        },
        {
          text: 'Roles',
          icon: 'perm_identity',
          module: 'Role',
          routerLink: 'Role',
          enabled: true,
        },
        {
          text: 'Modulos por Role',
          icon: 'accessibility',
          module: 'Menu-Role',
          enabled: true,
          routerLink: 'MenuRoles',
        },
      ],
    },
  ],
};
