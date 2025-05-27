import { DateTime } from 'luxon'

export const format_date = (date: string) => {
  const userZone = DateTime.local().zoneName

  return DateTime.fromISO(date)
    .setLocale('es')
    .setZone(userZone)
    .toFormat('LL/dd/yyyy HH:mm')
}
