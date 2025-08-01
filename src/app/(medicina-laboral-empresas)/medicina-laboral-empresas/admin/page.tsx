'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { useEffect, useState, type ReactElement } from 'react'
import {
  removeDataSessionMedintt,
  getDataSessionMedintt
} from 'utils/Medintt/session'

export default function AdminPage(): ReactElement {
  const [user, setUser] = useState<any>(undefined)

  const router = useRouter()
  useEffect(() => {
    const dataSession = getDataSessionMedintt()
    if (!dataSession.user) {
      router.push('/medicina-laboral-empresas')
    }
  }, [router])

  useEffect(() => {
    const userData = getDataSessionMedintt()
    setUser(userData.user)
  }, [])

  return (
    <div className='flex flex-column align-items-center my-8'>
      <div className='flex flex-column align-items-start gap-4 text-xl m-4'>
        <div>Bienvenido {user?.Nombre}</div>
        <div>Empresa: {user?.Prestatarias.Nombre}</div>
        <div>Email: {user?.Email}</div>
        <div>Cargo: {user?.Cargo}</div>
      </div>
      <Button
        label='Cerrar sesión'
        size='small'
        link
        onClick={() => {
          setUser(undefined)
          removeDataSessionMedintt()
          router.push('/medicina-laboral-empresas')
        }}
      />
    </div>
  )
}
