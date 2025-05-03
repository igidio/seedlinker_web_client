export interface device_interface {
  uuid: string;
  type: string;
  status: boolean;
}

export interface client_interface {
  info: string;
}

export interface current_devices_interface {
  [key: string]: {
    device?: device_interface;
    client?: client_interface;
    type: "device" | "client";
  };
}
