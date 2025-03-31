import { PrimeReactProvider } from 'primereact/api'
import NavBar from 'components/Medintt/NavBar'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './theme/theme.css'
import './theme/medintt.css'
import { type ReactElement } from 'react'
import Footer from 'components/Medintt/Footer'

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
        <body className='m-0 p-0 flex flex-column justify-content-between h-screen'>
          <NavBar />
          <div className='mt-8 pt-3'>
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </PrimeReactProvider>
  )
}
