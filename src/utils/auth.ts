import { type JWTPayload, type JWTVerifyResult, jwtVerify } from 'jose'
import { type Account, type Permissions } from './types'
import { parse } from 'cookie'

export const hasPermission = (
  permissionNeeded: Permissions,
  currentPermission: Permissions[]
): boolean => {
  return currentPermission.includes(permissionNeeded)
}

export const setNewUser = async (
  token: Record<string, string>,
  setUser
): Promise<void> => {
  const newUser = await verifyToken(token)
  if (newUser) {
    setUser(newUser)
  }
}

export const getUserToken = (): Record<string, string> => {
  const token: Record<string, string> = parse(document.cookie || '')
  return token
}

export const verifyToken = async (
  token: Record<string, string>
): Promise<Account | null> => {
  try {
    const secret = Buffer.from('my_secret_key', 'utf-8').toString('base64')
    const response: JWTVerifyResult<JWTPayload> = await jwtVerify(
      token.auth,
      new TextEncoder().encode(secret)
    )
    const payload = response.payload
    const account: Account = {
      id: payload.id as number,
      username: payload.username as string,
      password: payload.password as string,
      permissions: [...(payload.permissions as Permissions[])]
    }
    return account
  } catch (error) {
    return null
  }
}
