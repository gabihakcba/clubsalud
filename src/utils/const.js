export const APP = 36

export const calculatePages = (registers, regPerPage) => {
  return Math.ceil(registers/regPerPage)
}
