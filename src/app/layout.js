import './globals.css'
import Head from 'next/head'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import 'primereact/resources/themes/lara-dark-cyan/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

export const metadata = {
  title: 'Club Salud',
  description: 'Gimnasio con seguimiento médico'
}

export default function RootLayout({ children }) {
  return (
    <PrimeReactProvider>
      <html lang='en'>
        <Head>
          <link
            id='app-theme'
            rel='stylesheet'
            href='/themes/lara-dark-blue/theme.css'
          />
        </Head>
        <body>{children}</body>
      </html>
    </PrimeReactProvider>
  )
}
