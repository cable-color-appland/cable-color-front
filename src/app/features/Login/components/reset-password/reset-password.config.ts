export const ResetConfig = Object.freeze({
  i18n: {
    title: 'Cambiar Contraseña',
    placeholderPassword: 'contraseña',
    errorMessagePassword: 'Por favor ingresar la contraseña',
    placeholderConfirmPassword: 'confirmar contraseña',
    errorMessageConfirmPassword: 'Por favor confirmar la contraseña',
    errorMessagePasswordMismatch: 'Las contraseñas no coinciden',
    successMessage: 'Contraseña cambiada correctamente',
    errorMessage: 'Error al cambiar la contraseña',
    passwordLength: 'La contraseña debe tener al menos 8 caracteres',
    passwordComplexity:
      'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
    emptySpace: ' ',
    buttons: {
      change: 'Cambiar',
      cancel: 'Cancelar',
    },
  },
  pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*W)(?!.*s).{8,}$/',
});
