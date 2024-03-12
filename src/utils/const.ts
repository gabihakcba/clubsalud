export const APP = 52

export const calculatePages = (registers: number, regPerPage: number): number => {
  return Math.ceil(registers/regPerPage)
}
