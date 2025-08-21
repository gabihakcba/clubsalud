import moment from 'moment-timezone'
import 'moment/locale/es'

// Configuración para Argentina (GMT-3)
const TIMEZONE = 'America/Argentina/Buenos_Aires' // importa el locale español

moment.locale('es') // establece el locale por defecto a español

export const DateUtils = {
  // Type date
  newDate: (date: Date | null | undefined | moment.Moment | string) => {
    return moment(date).utc().toDate()
  },

  toLocalString: (date: Date): string => {
    return moment(date).tz(TIMEZONE).toISOString()
  },

  startOfMonth: (date: Date): Date => {
    return moment(date).startOf('month').toDate()
  },

  endOfMonth: (date: Date): Date => {
    return moment(date).endOf('month').toDate()
  },

  // Obtener fecha/hora actual como objeto Moment
  getCurrentMoment: (): moment.Moment => {
    return moment().tz(TIMEZONE)
  },

  // Obtener fecha/hora actual como objeto Date
  getCurrentDate: (): Date => {
    return moment().tz(TIMEZONE).toDate()
  },

  // Formatear fecha a 'DD-MM-YY'
  formatToDDMMYY: (date: moment.Moment | Date | string): string => {
    return moment(date).tz(TIMEZONE).format('DD-MM-YY')
  },

  formatToDDMMYYutc: (date: moment.Moment | Date | string): string => {
    return moment(date).utc().format('DD-MM-YY')
  },

  // Comparar si dos fechas son el mismo día
  isSameDay: (
    date1: moment.Moment | Date,
    date2: moment.Moment | Date
  ): boolean => {
    return moment(date1).tz(TIMEZONE).isSame(moment(date2).tz(TIMEZONE), 'day')
  },

  // Comparar si dos fechas son el mismo mes
  isSameMonth: (
    date1: moment.Moment | Date,
    date2: moment.Moment | Date
  ): boolean => {
    return moment(date1)
      .tz(TIMEZONE)
      .isSame(moment(date2).tz(TIMEZONE), 'month')
  },

  // Comparar si dos fechas son el mismo año
  isSameYear: (
    date1: moment.Moment | Date,
    date2: moment.Moment | Date
  ): boolean => {
    return moment(date1).tz(TIMEZONE).isSame(moment(date2).tz(TIMEZONE), 'year')
  },

  // Obtener el mes de una fecha (0-11)
  getMonth: (date: moment.Moment | Date): number => {
    return moment(date).tz(TIMEZONE).month()
  },

  getNameMonth: (date: moment.Moment | Date): string => {
    return moment(date).tz(TIMEZONE).format('MMMM')
  },

  // Obtener el año de una fecha
  getYear: (date: moment.Moment | Date): number => {
    return moment(date).tz(TIMEZONE).year()
  },

  // Obtener el día del mes de una fecha (1-31)
  getDay: (date: moment.Moment | Date): number => {
    return moment(date).tz(TIMEZONE).date()
  },

  getNameYear: (date: moment.Moment | Date): string => {
    return moment(date).tz(TIMEZONE).format('YYYY')
  },

  // Sumar tiempo a una fecha
  addTime: (
    date: moment.Moment | Date,
    amount: number,
    unit: 'days' | 'months' | 'years' | 'hours' | 'minutes' | 'seconds'
  ): moment.Moment => {
    return moment(date).tz(TIMEZONE).add(amount, unit)
  },

  // Verificar si una fecha está entre otras dos fechas
  isBetween: (
    dateToCheck: moment.Moment | Date,
    startDate: moment.Moment | Date,
    endDate: moment.Moment | Date,
    inclusive: boolean = true
  ): boolean => {
    return moment(dateToCheck)
      .tz(TIMEZONE)
      .isBetween(
        moment(startDate).tz(TIMEZONE),
        moment(endDate).tz(TIMEZONE),
        null,
        inclusive ? '[]' : '()'
      )
  },

  // Convertir string a Moment
  parseString: (
    dateString: string,
    format: string = 'DD-MM-YYYY'
  ): moment.Moment => {
    return moment.tz(dateString, format, TIMEZONE)
  }
}
