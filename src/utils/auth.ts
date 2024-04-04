import { JWTPayload, JWTVerifyResult, jwtVerify } from 'jose'
import { Account } from './types'
import { Permissions } from './types'
import { parse } from 'cookie'

export const hasPermission = (
  permissionNeeded: Permissions,
  currentPermission: Permissions
) => {
  return permissionNeeded === currentPermission
}

export const setNewUser = async (token, setUser) => {
  const newUser = await verifyToken(token)
  if (newUser) {
    setUser(newUser)
  }
}

export const getUserToken = () => {
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
      permissions: payload.permissions as Permissions
    }
    return account
  } catch (error) {
    return null
  }
}
