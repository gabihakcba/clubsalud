export const setDataSession = (token: any, user: any): void => {
  clearDataSession()
  localStorage.setItem('token', JSON.stringify(token))
  localStorage.setItem('user', JSON.stringify(user))
}

export const clearDataSession = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getTokenSession = (): any => {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(token) : null
}

export const getUserSession = (): any => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user)[0] : null
}

export const getDataSession = (): { token: any; user: any } => {
  return { token: getTokenSession(), user: getUserSession() }
}
