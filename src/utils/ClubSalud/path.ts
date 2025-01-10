export const development = 'http://localhost:3000'
export const production = 'https://clubsalud.vercel.app'
export const test = 'https://stagingcs.vercel.app/'

export const path = (): string => {
  const path = process.env.NEXT_PUBLIC_NODE_PATH
  return path ?? ''
}
