import '../globals.css'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-dark-cyan/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { type ReactElement } from 'react'

export const metadata = {
  title: 'Club Salud',
  description: 'Gimnasio con seguimiento médico'
}

export default function RootLayout({
  children
}: {
  children: any
}): ReactElement {
  return (
    <PrimeReactProvider>
      <html lang='en'>
        <head>
          <link
            rel='icon'
            href='/logos/medintt_positivo_square.png'
            type='image/x-icon'
          ></link>
        </head>
        <body className=''>{children}</body>
      </html>
    </PrimeReactProvider>
  )
}
