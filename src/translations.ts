export const translations = {
  en: {
    save: 'Save',
    delete: 'Delete',
    connect: 'Connect',
    add: 'Add',
    close: 'Close',
    cancel: 'Cancel',
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
      status_false: 'You must re-enable the device to configure the other aspects.',
      status_values: {
        active: 'Active',
        inactive: 'Inactive',
      },
      conditions: {
        title: 'Conditions',
        by_sensor: 'By sensor',
        by_time: 'By time',
        label: {
          input: 'Sensor pin',
          input_mode: 'Sensor type',
          output: 'Actuator pin',
          min_value: 'Minimum value',
          max_value: 'Maximum value',
          start_time: 'Start time',
          end_time: 'End time',
        },
        error: {
          number_comparison: 'Minimum value must be less than to maximum value',
          input_device_required: 'The sensor or input device is required',
          output_device_required: 'The actuator or output device is required',
          at_least_one_value_required: 'At least one value is required',
          negative_numbers_not_allowed: 'Negative numbers are not allowed',
          start_hour_required: 'Start hour is required',
          start_minute_required: 'Start minute is required',
          end_hour_required: 'End hour is required',
          end_minute_required: 'End minute is required',
          start_hour_invalid: 'Start hour is invalid',
          end_hour_invalid: 'End hour is invalid',
          start_minute_invalid: 'Start minute is invalid',
          end_minute_invalid: 'End minute is invalid',
        },
      },
      manual: {
        title: 'Actuators',
      },
      config: {
        auto: 'Automatic',
        manual: 'Manual',
        disable: 'Set to off',
        enable: 'Set to on',
        delete: {
          trigger: 'Delete',
          title: 'Delete device',
          description: 'Are you sure you want to delete this device?',
        },
      },
      io: {
        empty: 'No connected components (I/O) registered.',
        values: {
          temperature_and_humidity_sensor: 'Temperature and humidity sensor',
          water_sensor: 'Water sensor',
          heater: 'Heater',
          air_conditioner: 'Air conditioner',
          water_pump: 'Water pump',
        },
        modes: {
          analog: 'Analog',
          digital: 'Digital',
          humidity: 'Humidity',
          temperature_celsius: 'Temperature (Celsius)',
          temperature_fahrenheit: 'Temperature (Fahrenheit)',
        },
      },
      pin: {
        title: 'Connected I/O',
        button: 'New component (I/O)',
        status: {
          active: 'Active',
          inactive: 'Inactive',
        },
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
              },
            },
          },
          error: {
            analog_output: 'You cannot assign an analog pin to an actuator.',
          },
        },
        condition: {
          title: {
            sensor: {
              create: 'Add condition by sensor',
              update: 'Edit condition by sensor',
            },
            time: {
              create: 'Add condition by time',
              update: 'Edit condition by time',
            },
          },
          fields: {
            input: {
              label: 'Sensor or input device',
              empty: 'No sensor registered, you must register one to continue.',
            },
            mode: {
              label: 'Sensor mode',
              empty: 'No mode selected, please select one.',
              placeholder: 'Select a mode',
            },
            output: {
              label: 'Actuator or output device',
              empty: 'No actuator registered, you must register one to continue.',
            },
            start_time: {
              label: 'Start time (24h)',
              placeholder: {
                hour: 'Start hour (0-23)',
                minute: 'Start minute (0-59)',
              },
            },
            end_time: {
              label: 'End time (24h)',
              placeholder: {
                hour: 'End hour (0-23)',
                minute: 'End minute (0-59)',
              },
            },
            min_value: 'Minimum value',
            max_value: 'Maximum value',
          },
          empty: 'No condition of this type registered.',
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
      title: 'Home',
      available_devices: 'Available devices',
      connection_state: {
        is_loading: 'We are connecting your device to the services. Please wait a moment.',
        is_idling: 'Visible devices that connect to your network will appear here.',
        error: 'Could not connect to the services. Please check your internet connection.',
        no_device: 'You have not registered any devices yet.',
      },
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
        subtitle: 'Connected devices as clients will be shown here',
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
        unprocessable: 'The submitted data is not valid',
      },
    },
  },
  es: {
    save: 'Guardar',
    delete: 'Eliminar',
    connect: 'Conectar',
    add: 'Agregar',
    close: 'Cerrar',
    cancel: 'Cancelar',
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
      status_false: 'Debes volver a habilitar el dispositivo para configurar los demás aspectos.',
      status_values: {
        active: 'Activo',
        inactive: 'Inactivo',
      },
      conditions: {
        title: 'Condiciones',
        by_sensor: 'Por sensor',
        by_time: 'Por tiempo',
        label: {
          input: 'Pin del sensor',
          input_mode: 'Modo del sensor',
          output: 'Pin del actuador',
          min_value: 'Valor mínimo',
          max_value: 'Valor máximo',
          start_time: 'Hora de inicio',
          end_time: 'Hora de fin',
        },
        error: {
          input_device_required: 'El sensor o dispositivo de entrada es obligatorio',
          output_device_required: 'El actuador o dispositivo de salida es obligatorio',
          number_comparison: 'El valor mínimo debe ser menor al valor máximo',
          at_least_one_value_required: 'Se requiere al menos un valor',
          negative_numbers_not_allowed: 'No se permiten números negativos',
          start_hour_required: 'La hora de inicio es obligatoria',
          start_minute_required: 'El minuto de inicio es obligatorio',
          end_hour_required: 'La hora de fin es obligatoria',
          end_minute_required: 'El minuto de fin es obligatorio',
          start_hour_invalid: 'La hora de inicio es inválida',
          end_hour_invalid: 'La hora de fin es inválida',
          start_minute_invalid: 'El minuto de inicio es inválido',
          end_minute_invalid: 'El minuto de fin es inválido',
        },
      },
      manual: {
        title: 'Actuadores',
      },
      config: {
        auto: 'Automático',
        manual: 'Manual',
        disable: 'Desactivar',
        enable: 'Activar',
        delete: {
          trigger: 'Eliminar',
          title: 'Eliminar dispositivo',
          description: '¿Estás seguro de que deseas eliminar este dispositivo?',
        },
      },
      io: {
        empty: 'No hay ningún componente (I/O) registrado.',
        values: {
          temperature_and_humidity_sensor: 'Sensor de temperatura y humedad',
          water_sensor: 'Sensor de agua',
          heater: 'Calentador',
          air_conditioner: 'Acondicionador de aire',
          water_pump: 'Bomba de agua',
        },
        modes: {
          analog: 'Analógico',
          digital: 'Digital',
          humidity: 'Humedad',
          temperature_celsius: 'Temperatura (Celsius)',
          temperature_fahrenheit: 'Temperatura (Fahrenheit)',
        },
      },
      pin: {
        title: 'I/O conectados',
        button: 'Nuevo componente (I/O)',
        status: {
          active: 'Activo',
          inactive: 'Inactivo',
        },
      },
      modal: {
        io: {
          submit: 'Componente (I/O) agregado correctamente',
          title: {
            create: 'Agregar nuevo componente (I/O)',
            edit: 'Modificar componente (I/O)',
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
              },
            },
            error: {
              analog_output: 'No puedes asignar un pin analógico a un actuador.',
            },
          },
        },
        condition: {
          title: {
            sensor: {
              create: 'Agregar condición por sensor',
              update: 'Modificar condición por sensor',
            },
            time: {
              create: 'Agregar condición por tiempo',
              update: 'Modificar condición por tiempo',
            },
          },
          fields: {
            input: {
              label: 'Sensor o dispositivo de entrada',
              empty: 'No hay ningún sensor registrado, debes registrar uno para continuar.',
            },
            mode: {
              label: 'Modo del sensor',
              empty: 'No hay ningún modo seleccionado, por favor selecciona uno.',
              placeholder: 'Selecciona un modo',
            },
            output: {
              label: 'Actuador o dispositivo de salida',
              empty: 'No hay ningún actuador registrado, debes registrar uno para continuar.',
            },
            start_time: {
              label: 'Hora y minuto de inicio (24h)',
              placeholder: {
                hour: 'Hora de inicio (0-23)',
                minute: 'Minuto de inicio (0-59)',
              },
            },
            end_time: {
              label: 'Hora y minuto de fin (24h)',
              placeholder: {
                hour: 'Hora de fin (0-23)',
                minute: 'Minuto de fin (0-59)',
              },
            },
            min_value: 'Valor mínimo',
            max_value: 'Valor máximo',
          },
          empty: 'No hay ninguna condición registrada de este tipo.',
        },
      },
      fields: {
        name: {
          placeholder: 'Nombre del dispositivo',
        },
      },
      alert: {
        edit: 'Dispositivo modificado correctamente',
      },
    },
    home: {
      title: 'Inicio',
      available_devices: 'Dispositivos disponibles',
      connection_state: {
        is_loading:
          'Estamos conectando tu dispositivo a los servicios. Por favor, espere un momento.',
        is_idling: 'Los dispositivos visibles que se conecten a tu red aparecerán acá.',
        error: 'No se pudo conectar a los servicios. Por favor, verifica tu conexión a internet.',
        no_device: 'No has registrado ningún dispositivo todavía.',
      },
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
        },
      },
      card_connected_client: {
        title: 'Clientes conectados',
        subtitle: "Los dispositivos conectados como 'cliente' se mostrarán aquí",
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
        invalid_uuid: 'El UUID no es válido',
        device_not_found: 'Dispositivo no encontrado, por favor verifique el UUID',
        unprocessable: 'Los datos enviados no son válidos',
      },
    },
  },
}
