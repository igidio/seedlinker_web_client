import { DateTime } from 'luxon'
const userZone = DateTime.local().zoneName

export const format_datetime = (date: string) => {
  return DateTime.fromISO(date).setLocale('es').setZone(userZone).toFormat('LL/dd/yyyy HH:mm')
}

export const format_date = (date: string) => {
  return DateTime.fromISO(date).setLocale('es').setZone(userZone).toFormat('LL/dd/yyyy')
}
