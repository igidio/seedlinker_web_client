const uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const is_valid_uuid = (uuid: string) => {
  return uuid_regex.test(uuid);
}
