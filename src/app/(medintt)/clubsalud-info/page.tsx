'use client'

import { Button } from 'primereact/button'
import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export default function ClubSaludInfo(): ReactElement {
  const router: AppRouterInstance = useRouter()
  return (
    <>
      <Button
        label='Club Salud'
        onClick={() => {
          router.push('/clubsalud')
        }}
      />
      <div className='background-red h-screen'></div>
    </>
  )
}
