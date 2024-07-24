import moment, { type Moment } from 'moment'

export const argDate = (): Date => {
  return moment().local().toDate()
}

export const arg2Date = (date: Date): Date => {
  return moment(date).toDate()
}

export const argString2Date = (date: string): Date => {
  return moment(date).toDate()
}

export const argDate2Format = (date: Date): string => {
  return moment(date).format('DD-MM-YY')
}

export const argMoment2Format = (date: Moment): string => {
  return date.format('DD-MM-YY')
}

export const isSameDay = (dateA: Date, dateB: Date): boolean => {
  return moment(dateA).isSame(moment(dateB), 'day')
}

export const diffDate = (dateA: Date, dateB: Date): number => {
  return moment(dateA).diff(moment(dateB))
}

export const argGetMonth = (date: Date): number => {
  return moment(date).month()
}

export const argGetYear = (date: Date): number => {
  return moment(date).year()
}

export const argAddMonths = (dateA: Date, months: number): Date => {
  return moment(dateA).add(months as moment.DurationInputArg1, 'months').toDate()
}
