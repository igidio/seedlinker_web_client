export const translations = {
  en: {
    save: 'Save',
    delete: 'Delete',
    connect: 'Connect',
    close: 'Close',
    connect_manually: 'Connect manually',
    go_home: 'Go to home',
    select_language: 'Select language',
    profile: 'Edit profile',
    logout: 'Log out',
    configure: 'Configure',
    device: {
      uuid: 'UUID',
      status: 'Status',
      on: 'On',
      off: 'Off',
      mode: 'Mode',
      sensors_and_actuators: 'Sensors and actuators',
      io_label: 'Connected I/O',
      loading: 'Device information is loading',
      title: 'Your device',
      conditions: {
        title: 'Conditions',
        by_sensor: 'By sensor',
        by_time: 'By time',
        error: {
          number_comparison: 'Minimum value must be less than or equal to maximum value',
          input_device_required: 'The sensor or input device is required',
          output_device_required: 'The actuator or output device is required',
          at_least_one_value_required: 'At least one value is required',
        }
      },
      io: {
        values: {
          temperature_and_humidity_sensor: 'Temperature and humidity sensor',
          water_sensor: 'Water sensor',
          heater: 'Heater',
          air_conditioner: 'Air conditioner',
          water_pump: 'Water pump',
        }
      },
      pin: {
        title: 'Connected I/O',
        button: 'New component (I/O)',
        status: {
          active: 'Active',
          inactive: 'Inactive',
        }
      },
      modal: {
        io: {
          submit: 'Component (I/O) added successfully',
          title: {
            create: 'Add new component (I/O)',
            edit: 'Edit component (I/O)',
          },
          fields: {
            pin: {
              legend: 'Device pin',
              placeholder: 'Select a device pin',
              unavailable_pins: 'No more pins available',
            },
            io_type: {
              legend: 'Sensor or actuator',
              placeholder: 'Select a sensor or actuator',
              type: {
                sensor: 'Sensor',
                actuator: 'Actuator',
              }
            },
          }
        },
      },
      fields: {
        name: {
          placeholder: 'Device name',
        },
      },
      alert: {
        edit: 'Device updated successfully',
      },
    },
    home: {
      available_devices: 'Available devices',
      my_devices: {
        title: 'My devices',
        description: 'These are the devices you have registered on your account',
      },
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
      card_connected_client: {
        title: 'Connected clients',
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
        email: {
          required: 'Email is required',
          invalid: 'Email is not valid',
        },
        password: {
          required: 'Password is required',
          min_length: 'Password must be at least 8 characters long',
        },
        password_compare: 'Passwords do not match',
      },
      form: {
        user_not_found: 'User not found, please check your username or email',
        user_already_exists: 'Username already exists or email is already registered',
        invalid_password: 'Invalid password',
        invalid_uuid: 'Invalid UUID',
        device_not_found: 'Device not found, please check the UUID',
      },
    },
  },
  es: {
    save: 'Guardar',
    delete: 'Eliminar',
    connect: 'Conectar',
    close: 'Cerrar',
    profile: 'Modificar perfil',
    logout: 'Cerrar sesión',
    connect_manually: 'Conectar manualmente',
    configure: 'Configurar',
    go_home: 'Ir a inicio',
    select_language: 'Seleccionar idioma',
    device: {
      uuid: 'UUID',
      status: 'Estado',
      on: 'Encendido',
      off: 'Apagado',
      mode: 'Modo',
      sensors_and_actuators: 'Sensores y actuadores',
      io_label: 'I/O conectados',
      loading: 'La información del dispositivo se está cargando',
      title: 'Tu dispositivo',
      conditions: {
        title: 'Condiciones',
        by_sensor: 'Por sensor',
        by_time: 'Por tiempo',
        error: {
          input_device_required: 'El sensor o dispositivo de entrada es obligatorio',
          output_device_required: 'El actuador o dispositivo de salida es obligatorio',
          number_comparison: 'El valor mínimo debe ser menor o igual al valor máximo',
          at_least_one_value_required: 'Se requiere al menos un valor',
        }
      },
      io: {
        values: {
          temperature_and_humidity_sensor: 'Sensor de temperatura y humedad',
          water_sensor: 'Sensor de agua',
          heater: 'Calentador',
          air_conditioner: 'Acondicionador de aire',
          water_pump: 'Bomba de agua',
        }
      },
      pin: {
        title: 'I/O conectados',
        button: 'Nuevo componente (I/O)',
        status: {
          active: 'Activo',
          inactive: 'Inactivo',
        }
      },
      modal: {
        io: {
          submit: 'Componente (I/O) agregado correctamente',
          title: {
            create: 'Agregar nuevo componente (I/O)',
            edit: 'Modificar componente (I/O)'
          },
          fields: {
            pin: {
              legend: 'Pin del dispositivo',
              placeholder: 'Seleccione un pin del dispositivo',
              unavailable_pins: 'Ya no quedan más pines disponibles',
            },
            io_type: {
              legend: 'Sensor o actuador',
              placeholder: 'Seleccione un sensor o actuador',
              type: {
                sensor: 'Sensor',
                actuator: 'Actuador',
              }
            }
          }

        }
      },
      fields: {
        name: {
          placeholder: 'Nombre del dispositivo',
        }
      },
      alert: {
        edit: "Dispositivo modificado correctamente",
      }
    },
    home: {
      available_devices: 'Dispositivos disponibles',
      my_devices: {
        title: 'Mis dispositivos',
        description: 'Estos son los dispositivos que tienes registrados en tu cuenta',
      },
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
      card_connected_client: {
        title: 'Clientes conectados',
      }
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
        invalid_uuid: 'El UUID no es válido',
        device_not_found: 'Dispositivo no encontrado, por favor verifique el UUID',
      },
    },
  },
}
