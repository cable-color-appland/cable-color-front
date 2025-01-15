export const environment = {
  production: true,
  apiUrl:
    'back-cable-color-c6ctgcadengrgnes.canadacentral-01.azurewebsites.net/api',
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
          module: 'Paises',
          enabled: true,
        },
        {
          text: 'Regiones',
          icon: 'signpost',
          module: 'Departamentos',
          enabled: true,
        },
        {
          text: 'Ciudades',
          icon: 'apartment',
          module: 'Ciudades',
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
          module: 'Usuarios',
          enabled: true,
        },
        {
          text: 'Roles',
          icon: 'perm_identity',
          module: 'Roles',
          enabled: true,
        },
        {
          text: 'Modulos por Role',
          icon: 'accessibility',
          module: 'Modulos-Role',
          enabled: true,
        },
      ],
    },
  ],
};
