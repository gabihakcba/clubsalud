export const APP = 52

export const calculatePages = (
  registers: number,
  regPerPage: number
): number => {
  return Math.ceil(registers / regPerPage)
}

export const formatDate = (date: string, name: string): string => {
  console.log('date: ', date)
  const [YEAR, MONTH, DAY] = date.split('T')[0].split('-')
  const res = `${YEAR}-${MONTH}-${DAY}`
  if (name === 'Gabi') {
    console.log(res)
  }
  return res
}
