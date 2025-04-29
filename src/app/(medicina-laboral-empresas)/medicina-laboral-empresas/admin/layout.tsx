'use client'

import { Menu } from 'primereact/menu'
import { type ReactElement } from 'react'

export default function Layout({
  children
}: {
  children: ReactElement
}): ReactElement {
  return (
    <div className='flex flex-row h-full w-full h-full'>
      <Menu
        model={[
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            url: '/medicina-laboral-empresas/admin'
          },
          {
            label: 'Ausentismo',
            icon: 'pi pi-list-check',
            url: '/medicina-laboral-empresas/admin/ausentismo'
          }
        ]}
      />
      <div className='w-full h-full'>{children}</div>
    </div>
  )
}
