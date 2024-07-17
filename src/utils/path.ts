export const development = 'http://localhost:3000'
export const production = 'https://clubsalud.vercel.app'
export const test = 'https://stagingcs.vercel.app/'

export const path = (): string => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    return production
  } else if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
    return development
  } else {
    return test
  }
}
