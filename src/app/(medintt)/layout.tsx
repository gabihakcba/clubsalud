import '../globals.css'
import { PrimeReactProvider } from 'primereact/api'
import NavBar from 'components/Medintt/NavBar'
import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { type ReactElement } from 'react'

export const metadata = {
  title: 'Medintt - Tu salud nuestra especialidad',
  description: 'Centro Médico Privado'
}

export default function RootLayout({
  children
}: {
  children: any
}): ReactElement {
  return (
    <PrimeReactProvider>
      <html lang='en'>
        <body className=''>
          <NavBar className='mb-1 sticky w-screen top-0 z-5 flex justify-content-center filled bg-white shadow-2' />
          {children}
        </body>
      </html>
    </PrimeReactProvider>
  )
}
