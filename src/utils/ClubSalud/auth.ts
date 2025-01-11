import { type JWTPayload, type JWTVerifyResult, jwtVerify } from 'jose'
import { type Account, type Permissions } from './types'
import { parse } from 'cookie'

export const hasPermission = async (
  required: Permissions[]
): Promise<boolean> => {
  const token = getUserToken()
  const user = await verifyToken(token)
  const role = user?.permissions
  return required.some((permission) => role?.includes(permission))
}

export const setNewUser = async (
  token: Record<string, string | undefined>,
  setUser
): Promise<void> => {
  const newUser = await verifyToken(token)
  if (newUser) {
    setUser(newUser)
  }
}

export const getUserToken = (): Record<string, string | undefined> => {
  const token: Record<string, string | undefined> = parse(document.cookie || '')
  return token
}

export const verifyToken = async (
  token: Record<string, string | undefined>
): Promise<Account | null> => {
  try {
    const secret = Buffer.from('my_secret_key', 'utf-8').toString('base64')
    const response: JWTVerifyResult<JWTPayload> = await jwtVerify(
      token.auth ?? '',
      new TextEncoder().encode(secret)
    )
    const payload = response.payload
    const account: Account = {
      id: payload.id as number,
      username: payload.username as string,
      password: payload.password as string,
      permissions: [...(payload.permissions as Permissions[])]
    }
    // localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(account))
    return account
  } catch (error) {
    return null
  }
}

export const getUserInfo = async (): Promise<Account | null> => {
  const token = getUserToken()
  const userInfo = await verifyToken(token)
  return userInfo
}
