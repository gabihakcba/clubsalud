import moment from 'moment-timezone'

// Configuración para Argentina (GMT-3)
const TIMEZONE = 'America/Argentina/Buenos_Aires'

export const DateUtils = {
  toBackendFormat: (date: Date | moment.Moment | string): string => {
    return moment(date)
      .tz(TIMEZONE)
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
      .replace('-03:00', 'Z') // Asegura formato ISO válido
  },

  // Type date
  newDate: (date: Date | moment.Moment | string) => {
    return moment(date).tz(TIMEZONE).toDate()
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
  formatToDDMMYY: (date: moment.Moment | Date): string => {
    return moment(date).tz(TIMEZONE).format('DD-MM-YY')
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

  // Obtener el año de una fecha
  getYear: (date: moment.Moment | Date): number => {
    return moment(date).tz(TIMEZONE).year()
  },

  // Obtener el día del mes de una fecha (1-31)
  getDay: (date: moment.Moment | Date): number => {
    return moment(date).tz(TIMEZONE).date()
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
