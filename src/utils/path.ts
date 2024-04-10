export const development = 'http://localhost:3000'
export const test = 'https://clubsalud.vercel.app'
export const production = 'https://www.centromedicomedintt.com'

export const path = (): string => {
  if (process.env.NODE_ENV === 'production') {
    console.log('production')
    return production
  } else if (process.env.NODE_ENV === 'development') {
    console.log('development')
    return development
  } else {
    console.log('local')
    return test
  }
}
