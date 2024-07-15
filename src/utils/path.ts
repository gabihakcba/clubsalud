export const development = 'http://localhost:3000'
export const test = 'https://clubsalud.vercel.app'
export const production = 'https://clubsalud-eta.vercel.app/'

export const path = (): string => {
  console.log(process.env.NEXT_PUBLIC_NODE_ENV)
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    return production
  } else if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
    return development
  } else {
    return test
  }
}
