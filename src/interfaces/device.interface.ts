export interface DeviceInterface {
  _id:        ID;
  uuid:       string;
  user_uuid:  string;
  name:       string;
  type:       string;
  pins:       any[];
  status:     boolean;
  conditions: Conditions;
}

export interface ID {
  $oid: string;
}

export interface Conditions {
  by_time:  any[];
  by_event: any[];
}
