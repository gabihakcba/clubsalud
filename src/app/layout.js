// import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primeflex/primeflex.css'
// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Club Salud',
  description: 'Gimnasio con seguimiento médico'
}

export default function RootLayout({ children }) {
  return (
    <PrimeReactProvider>
      <html
        lang='en'
        // className='h-full w-full bg-white text-black'
      >
        <Head>
          <link
            id='app-theme'
            rel='stylesheet'
            href='/themes/lara-dark-blue/theme.css'
          />
        </Head>
        <body
        // className={`${inter.className} h-full w-full bg-white text-black`}
        >
          {children}
        </body>
      </html>
    </PrimeReactProvider>
  )
}
