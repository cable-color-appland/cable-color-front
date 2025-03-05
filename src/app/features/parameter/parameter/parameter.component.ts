import { Component } from '@angular/core';
import { ParameterConfig } from './parameter.confg';
import { ButtonEditComponent } from './components/button-edit/button-edit.component';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.scss',
})
export class ParameterComponent {
  public config = ParameterConfig;

  displayColumns = [
    ...this.config.tableHeader,
    {
      field: 'Action',
      title: 'Acciones',
      component: ButtonEditComponent,
    },
  ];

  handleAction(event: any) {
    // TODO: implement action logic based on event.action and row
    console.log(event);
  }

  ////TDO: DELETE
  public testData = [
    {
      id: 1,
      value: 'username',
      description: 'Nombre de usuario',
      restriction: 'Máx. 20 caracteres, sin espacios',
    },
    {
      id: 2,
      value: 'email',
      description: 'Correo electrónico',
      restriction: 'Debe ser un email válido',
    },
    {
      id: 3,
      value: 'password',
      description: 'Contraseña',
      restriction: 'Mín. 8 caracteres, al menos una mayúscula y un número',
    },
    {
      id: 4,
      value: 'age',
      description: 'Edad del usuario',
      restriction: 'Debe ser un número entre 18 y 99',
    },
    {
      id: 5,
      value: 'phone',
      description: 'Número de teléfono',
      restriction: 'Formato internacional, sin espacios',
    },
    {
      id: 6,
      value: 'birthdate',
      description: 'Fecha de nacimiento',
      restriction: 'Formato YYYY-MM-DD',
    },
    {
      id: 7,
      value: 'address',
      description: 'Dirección de residencia',
      restriction: 'Máx. 100 caracteres',
    },
    {
      id: 8,
      value: 'zipcode',
      description: 'Código postal',
      restriction: 'Debe contener solo números',
    },
    {
      id: 9,
      value: 'country',
      description: 'País de residencia',
      restriction: 'Debe ser un país válido',
    },
    {
      id: 10,
      value: 'city',
      description: 'Ciudad de residencia',
      restriction: 'Máx. 50 caracteres',
    },
    {
      id: 11,
      value: 'gender',
      description: 'Género',
      restriction: 'Opciones: Masculino, Femenino, Otro',
    },
    {
      id: 12,
      value: 'status',
      description: 'Estado civil',
      restriction: 'Opciones: Soltero, Casado, Divorciado, Viudo',
    },
    {
      id: 13,
      value: 'height',
      description: 'Altura en cm',
      restriction: 'Debe ser un número positivo',
    },
    {
      id: 14,
      value: 'weight',
      description: 'Peso en kg',
      restriction: 'Debe ser un número positivo',
    },
    {
      id: 15,
      value: 'language',
      description: 'Idioma preferido',
      restriction: 'Opciones: Español, Inglés, Francés, etc.',
    },
    {
      id: 16,
      value: 'subscription',
      description: 'Tipo de suscripción',
      restriction: 'Opciones: Básico, Premium, VIP',
    },
    {
      id: 17,
      value: 'employment',
      description: 'Situación laboral',
      restriction: 'Opciones: Empleado, Desempleado, Estudiante',
    },
    {
      id: 18,
      value: 'company',
      description: 'Nombre de la empresa',
      restriction: 'Máx. 50 caracteres',
    },
    {
      id: 19,
      value: 'role',
      description: 'Rol en la empresa',
      restriction: 'Máx. 30 caracteres',
    },
    {
      id: 20,
      value: 'notes',
      description: 'Notas adicionales',
      restriction: 'Máx. 200 caracteres',
    },
  ];
}
