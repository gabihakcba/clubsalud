'use client'

import 'primereact/resources/themes/lara-dark-cyan/theme.css'
import { type ReactElement } from 'react'

export default function AdminLayout({ children }: any): ReactElement {
  return (
    <div className='flex-grow-1 h-screen z-0'>
      {children}
    </div>
  )
}
