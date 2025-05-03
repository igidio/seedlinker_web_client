export const translations = {
  en: {
    save: 'Save',
    delete: 'Delete',
    connect: 'Connect',
    close: 'Close',
    connect_manually: 'Connect manually',
    go_home: 'Go to home',
    select_language: 'Select language',
    home: {
      available_devices: 'Available devices',
      modal_connect_device: {
        auto: {
          title: 'Connect {0}',
          description: 'This device will be automatically connected to the network:',
        },
        manual: {
          title: 'Connect {0} manually',
          description: 'Enter the UUID of the device you want to connect',
          field: {
            placeholder: 'Device UUID',
            label: 'The device must be powered on and connected to the network',
          },
          button: 'Connect',
          error: {
            no_available_device: 'The device is not available',
            already_registered: 'The device is already registered',
          },
        },
      },
    },
    login: {
      title: 'Log In',
      description: 'You must log in to access our services.',
      button: 'Log In',
      button_github: 'Log In with GitHub',
      button_google: 'Log In with Google',
      signup_redirection: {
        text: "Don't have an account? {0}",
        link: 'Sign Up',
      },
      fields: {
        username: 'Username or email',
        password: 'Password',
      },
    },
    signup: {
      title: 'Sign Up',
      description: 'Fill in the following fields to register.',
      button: 'Sign Up',
      login_redirection: {
        text: 'Already have an account? {0}',
        link: 'Log In',
      },
      fields: {
        username: 'Username',
        email: 'Email',
        password: 'Password',
        confirm_password: 'Confirm Password',
      },
      terms_and_conditions: {
        text: 'By signing up, you agree to our {0}',
        link: 'terms and conditions',
      },
    },
    error: {
      input: {
        username: {
          required: 'Username is required',
          min_length: 'Username must be at least 3 characters long',
        },
        password: {
          required: 'Password is required',
          min_length: 'Password must be at least 8 characters long',
        },
      },
      form: {
        user_not_found: 'User not found, please check your username or email',
        user_already_exists: 'Username already exists or email is already registered',
        invalid_password: 'Invalid password',
      },
    },
  },
  es: {
    save: 'Guardar',
    delete: 'Eliminar',
    connect: 'Conectar',
    close: 'Cerrar',
    connect_manually: 'Conectar manualmente',
    go_home: 'Ir a inicio',
    select_language: 'Seleccionar idioma',
    home: {
      available_devices: 'Dispositivos disponibles',
      modal_connect_device: {
        auto: {
          title: 'Conectar {0}',
          description: 'Este dispositivo será conectado automáticamente a la red:',
        },
        manual: {
          title: 'Conectar manualmente',
          description: 'Introduce el UUID del dispositivo que desea conectar',
          field: {
            placeholder: 'UUID del dispositivo',
            label: 'El dispositivo debe estar encendido y conectado a la red',
          },
          button: 'Conectar',
          error: {
            no_available_device: 'El dispositivo no está disponible',
            already_registered: 'El dispositivo ya está registrado',
          },
        },
      },
    },
    login: {
      title: 'Iniciar sesión',
      description: 'Debes iniciar sesión para acceder a nuestros servicios.',
      button: 'Iniciar sesión',
      button_github: 'Iniciar con GitHub',
      button_google: 'Iniciar con Google',
      signup_redirection: {
        text: '¿No tienes una cuenta?, {0}',
        link: 'Regístrate',
      },
      fields: {
        username: 'Nombre de usuario o correo electrónico',
        password: 'Contraseña',
      },
    },
    signup: {
      title: 'Registrarse',
      description: 'Llena los siguientes campos para registrarte.',
      button: 'Registrarse',
      login_redirection: {
        text: '¿Ya tienes una cuenta?, {0}',
        link: 'Inicia sesión',
      },
      fields: {
        username: 'Nombre de usuario',
        email: 'Correo electrónico',
        password: 'Contraseña',
        confirm_password: 'Confirmar contraseña',
      },
      terms_and_conditions: {
        text: 'Al ingresar estás aceptando los {0}',
        link: 'términos y condiciones',
      },
    },
    error: {
      input: {
        username: {
          required: 'El nombre de usuario es obligatorio',
          min_length: 'El nombre de usuario debe tener al menos 3 caracteres',
        },
        email: {
          required: 'El correo electrónico es obligatorio',
          invalid: 'El correo electrónico no es válido',
        },
        password: {
          required: 'La contraseña es obligatoria',
          min_length: 'La contraseña debe tener al menos 8 caracteres',
        },
        password_compare: 'Las contraseñas no coinciden',
      },
      form: {
        user_not_found:
          'Usuario no encontrado, por favor verifique su nombre de usuario o correo electrónico',
        user_already_exists: 'El nombre de usuario ya existe o el correo ya está registrado',
        invalid_password: 'La contraseña es incorrecta',
      },
    },
  },
}
