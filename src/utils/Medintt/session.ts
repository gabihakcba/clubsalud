export const setDataSession = (token: string, user: any): void => {
  clearDataSession()
  if (token && token !== 'undefined' && token !== 'null') {
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export const clearDataSession = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getTokenSession = (): any => {
  const token = localStorage.getItem('token')
  if (!token || token === 'undefined' || token === 'null') {
    return null
  }
  return JSON.parse(token)
}

export const getUserSession = (): any => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const getDataSession = (): { token: any; user: any } => {
  return { token: getTokenSession(), user: getUserSession() }
}
