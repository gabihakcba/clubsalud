export const APP = 52

export enum ACCOUNTTYPE {
  'ACCOUNT',
  'MEMBER',
  'INSTRUCTOR'
}

export const calculatePages = (
  registers: number,
  regPerPage: number
): number => {
  return Math.ceil(registers / regPerPage)
}

export const formatDate = (date: string = ''): string => {
  const [YEAR, MONTH, DAY] = date.split('T')[0].split('-')
  const res = `${YEAR}-${MONTH}-${DAY}`
  return res
}
