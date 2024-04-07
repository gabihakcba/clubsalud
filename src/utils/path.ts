export const dev = 'http://localhost:3000'
export const production = 'https://clubsalud-gabihakcbas-projects.vercel.app/'

export const path = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return production
  } else {
    return dev
  }
}
