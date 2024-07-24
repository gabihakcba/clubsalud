import moment, { Moment } from 'moment'

export const argDate = () => {
  return moment().local().toDate()
}

export const arg2Date = (date: Date) => {
  return moment(date).toDate()
}

export const argString2Date = (date: string) => {
  return moment(date).toDate()
}

export const argDate2Format = (date: Date) => {
  return moment(date).format('DD-MM-YY')
}

export const argMoment2Format = (date: Moment) => {
  return date.format('DD-MM-YY')
}

export const isSameDay = (dateA: Date, dateB: Date) => {
  return moment(dateA).isSame(moment(dateB), 'day')
}

export const diffDate = (dateA: Date, dateB: Date) => {
  return moment(dateA).diff(moment(dateB))
}

export const argGetMonth = (date: Date) => {
  return moment(date).month()
}

export const argGetYear = (date: Date) => {
  return moment(date).year()
}

export const argAddMonths = (dateA: Date, months: number) => {
  return moment(dateA).add(months as moment.DurationInputArg1, 'months').toDate()
}