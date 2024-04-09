export const dev = 'http://localhost:3000'
export const development = 'https://clubsalud.vercel.app'
export const production = 'https://www.centromedicomedintt.com'

export const path = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return development
  } else if (process.env.NODE_ENV === 'production') {
    return production
  } else {
    return dev
  }
}
