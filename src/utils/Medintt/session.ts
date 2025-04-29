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
  return localStorage.getItem('token')
}

export const getUserSession = (): any => {
  return localStorage.getItem('user')
}

export const getDataSession = (): { token: any; user: any } => {
  return { token: getTokenSession(), user: getUserSession() }
}
