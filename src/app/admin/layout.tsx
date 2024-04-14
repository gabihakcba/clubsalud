'use client'

import Link from 'next/link'
import Image from 'next/image'
import health from '../../../public/health-plan.svg'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ReactElement } from 'react'
import { parse } from 'cookie'
import { LeftArrow } from '../../../public/svgs/LeftArrow'
import { RightArrow } from '../../../public/svgs/RightArrow'
import { logOutAccount } from 'queries/accounts'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Permissions } from 'utils/types'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HasRole from 'components/HasRole'

const logOut = async (router: AppRouterInstance): Promise<void> => {
  try {
    await logOutAccount()
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

const client = new QueryClient()

export default function AdminLayout({ children }: any): ReactElement {
  const router: AppRouterInstance = useRouter()
  const pathname: string = usePathname()
  const [drop, setDrop] = useState<boolean>(false)

  useEffect(() => {
    const cookies: Record<string, string> = parse(document.cookie || '')
    if (!cookies.auth) {
      router.push('/')
    }
  }, [router])

  return (
    <QueryClientProvider client={client}>
      <div className='h-full w-full bg-white text-black'>
        {!drop && (
          <button
            onClick={() => {
              setDrop((prev) => !prev)
            }}
            type='button'
            className='fixed top-0 right-0 z-10'
          >
            <LeftArrow></LeftArrow>
          </button>
        )}
        {drop && (
          <aside
            id='default-sidebar'
            className='fixed top-0 right-0 z-40 w-64 h-screen'
            aria-label='Sidebar'
          >
            <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
              <ul className='space-y-2 font-medium'>
                <li>
                  <Link
                    href='/admin/payment'
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin/payment' ? 'bg-gray-500' : ''}`}
                  >
                    <svg
                      className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 22 21'
                    >
                      <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                      <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                    </svg>
                    <span className='ms-3'>Pagos</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/admin/attendance'
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin/attendance' ? 'bg-gray-500' : ''}`}
                  >
                    <svg
                      className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 18 18'
                    >
                      <path d='M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z' />
                    </svg>
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Asistencia
                    </span>
                    <span className='inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300'>
                      Pro
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/admin/notifications'
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin/notifications' ? 'bg-gray-500' : ''}`}
                  >
                    <svg
                      className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z' />
                    </svg>
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Notificaiones
                    </span>
                    <span className='inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>
                      3
                    </span>
                  </Link>
                </li>
                <HasRole required={[Permissions.ADM, Permissions.OWN]}>
                  <li>
                    <Link
                      href='/admin/accounts'
                      className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin/accounts' ? 'bg-gray-500' : ''}`}
                    >
                      <svg
                        className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 20 18'
                      >
                        <path d='M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z' />
                      </svg>
                      <span className='flex-1 ms-3 whitespace-nowrap'>
                        Cuentas
                      </span>
                    </Link>
                  </li>
                </HasRole>
                <li>
                  <Link
                    href='/admin/schedule'
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin/schedule' ? 'bg-gray-500' : ''}`}
                  >
                    <svg
                      className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 18'
                    >
                      <g
                        id='SVGRepo_bgCarrier'
                        strokeWidth='0'
                      ></g>
                      <g
                        id='SVGRepo_tracerCarrier'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        stroke='#fcfcfc'
                        strokeWidth='2.88'
                      >
                        {' '}
                        <title>Calendar-empty</title> <defs> </defs>{' '}
                        <g
                          stroke='none'
                          strokeWidth='1'
                          fill='none'
                          fillRule='evenodd'
                        >
                          {' '}
                          <g fill='#919191'>
                            {' '}
                            <rect
                              x='4'
                              y='0'
                              width='0.971'
                              height='1.911'
                              className='si-glyph-fill'
                            >
                              {' '}
                            </rect>{' '}
                            <rect
                              x='11'
                              y='0'
                              width='1'
                              height='1.906'
                              className='si-glyph-fill'
                            >
                              {' '}
                            </rect>{' '}
                            <g transform='translate(0.000000, 1.000000)'>
                              {' '}
                              <path
                                d='M15.976,3.959 L15.976,1.456 C15.976,0.685 15.37,0.058 14.622,0.058 L13.032,0.058 L13.032,2.084 L9.968,2.084 L9.968,0.058 L6.034,0.058 L6.034,2.084 L2.938,2.084 L2.938,0.058 L1.401,0.058 C0.653,0.058 0.047,0.685 0.047,1.456 L0.047,3.959 L15.976,3.959 L15.976,3.959 Z'
                                className='si-glyph-fill'
                              >
                                {' '}
                              </path>{' '}
                              <path
                                d='M0.046,5.003 L0.046,13.565 C0.046,14.337 0.652,14.964 1.4,14.964 L14.621,14.964 C15.369,14.964 15.975,14.337 15.975,13.565 L15.975,5.003 L0.046,5.003 L0.046,5.003 Z'
                                className='si-glyph-fill'
                              >
                                {' '}
                              </path>{' '}
                            </g>{' '}
                          </g>{' '}
                        </g>{' '}
                      </g>
                      <g id='SVGRepo_iconCarrier'>
                        {' '}
                        <title>Calendar-empty</title> <defs> </defs>{' '}
                        <g
                          stroke='none'
                          strokeWidth='1'
                          fill='none'
                          fillRule='evenodd'
                        >
                          {' '}
                          <g fill='#919191'>
                            {' '}
                            <rect
                              x='4'
                              y='0'
                              width='0.971'
                              height='1.911'
                              className='si-glyph-fill'
                            >
                              {' '}
                            </rect>{' '}
                            <rect
                              x='11'
                              y='0'
                              width='1'
                              height='1.906'
                              className='si-glyph-fill'
                            >
                              {' '}
                            </rect>{' '}
                            <g transform='translate(0.000000, 1.000000)'>
                              {' '}
                              <path
                                d='M15.976,3.959 L15.976,1.456 C15.976,0.685 15.37,0.058 14.622,0.058 L13.032,0.058 L13.032,2.084 L9.968,2.084 L9.968,0.058 L6.034,0.058 L6.034,2.084 L2.938,2.084 L2.938,0.058 L1.401,0.058 C0.653,0.058 0.047,0.685 0.047,1.456 L0.047,3.959 L15.976,3.959 L15.976,3.959 Z'
                                className='si-glyph-fill'
                              >
                                {' '}
                              </path>{' '}
                              <path
                                d='M0.046,5.003 L0.046,13.565 C0.046,14.337 0.652,14.964 1.4,14.964 L14.621,14.964 C15.369,14.964 15.975,14.337 15.975,13.565 L15.975,5.003 L0.046,5.003 L0.046,5.003 Z'
                                className='si-glyph-fill'
                              >
                                {' '}
                              </path>{' '}
                            </g>{' '}
                          </g>{' '}
                        </g>{' '}
                      </g>
                    </svg>
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Horarios
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/admin/classes'
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin/classes' ? 'bg-gray-500' : ''}`}
                  >
                    <svg
                      className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 18 20'
                    >
                      <path d='M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z' />
                    </svg>
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Clases y Ofertas
                    </span>
                  </Link>
                </li>
                {/* <li>
                <Link href="#" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/todo' ? 'bg-gray-500' : ''}`}>
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                </Link>
              </li> */}
                <li>
                  <Link
                    href='/admin/healthPlan'
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin/healthPlan' ? 'bg-gray-500' : ''}`}
                  >
                    <Image
                      src={health}
                      alt='+'
                      width={20}
                      height={20}
                    ></Image>
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Obras Sociales
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/admin/accounting'
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin/accounting' ? 'bg-gray-500' : ''}`}
                  >
                    {/* <svg
                      className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 18 20'
                    >
                      <path d='M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z' />
                    </svg> */}
                    <svg
                      width='1.25rem'
                      height='1.25rem'
                      viewBox='0 0 91 91'
                      enableBackground='new 0 0 91 91'
                      id='Layer_1'
                      // xmlSpace='preserve'
                      // xmlns='http://www.w3.org/2000/svg'
                      // xmlns:xlink='http://www.w3.org/1999/xlink'
                    >
                      <g>
                        <g>
                          <path
                            d='M5.895,90.438h72.521c3.463,0,6.285-2.82,6.285-6.287v-62.73H5.895V90.438z M37.844,74.739    c1.072,1.074,1.072,2.816,0,3.891c-0.539,0.537-1.242,0.803-1.945,0.803s-1.408-0.266-1.947-0.805l-5.564-5.57l-5.566,5.568    c-0.539,0.537-1.24,0.807-1.945,0.807c-0.703,0-1.408-0.27-1.943-0.807c-1.076-1.072-1.076-2.814,0-3.889l5.568-5.568l-5.568-5.57    c-1.076-1.076-1.076-2.816,0-3.891c1.074-1.074,2.814-1.074,3.889,0l5.566,5.57l5.564-5.568c1.078-1.074,2.816-1.074,3.893,0    c1.072,1.072,1.072,2.814,0,3.889l-5.568,5.57L37.844,74.739z M63.885,79.778h-1.922c-1.52,0-2.752-1.23-2.752-2.75    s1.232-2.75,2.752-2.75h1.922c1.52,0,2.754,1.23,2.754,2.75S65.404,79.778,63.885,79.778z M54.125,37.571h17.588    c1.52,0,2.754,1.23,2.754,2.75s-1.234,2.75-2.754,2.75H54.125c-1.516,0-2.748-1.23-2.748-2.75S52.609,37.571,54.125,37.571z     M66.639,61.286c0,1.52-1.234,2.752-2.754,2.752h-1.922c-1.52,0-2.752-1.232-2.752-2.752c0-1.518,1.232-2.75,2.752-2.75h1.922    C65.404,58.536,66.639,59.769,66.639,61.286z M54.125,66.417h17.588c1.52,0,2.754,1.23,2.754,2.75s-1.234,2.75-2.754,2.75H54.125    c-1.516,0-2.748-1.23-2.748-2.75S52.609,66.417,54.125,66.417z M19.598,37.571h6.037v-6.039c0-1.52,1.232-2.75,2.75-2.75    c1.52,0,2.75,1.23,2.75,2.75v6.039h6.047c1.516,0,2.75,1.23,2.75,2.75s-1.234,2.75-2.75,2.75h-6.047v6.043    c0,1.52-1.23,2.752-2.75,2.752c-1.518,0-2.75-1.232-2.75-2.752v-6.043h-6.037c-1.52,0-2.754-1.23-2.754-2.75    S18.078,37.571,19.598,37.571z'
                            fill='#647F94'
                          />

                          <rect
                            fill='#45596B'
                            height='14.791'
                            width='78.807'
                            x='5.895'
                            y='1.128'
                          />
                        </g>
                      </g>
                    </svg>
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Balances
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/admin'
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/admin' ? 'bg-gray-500' : ''}`}
                  >
                    <svg
                      className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 18 20'
                    >
                      <path d='M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z' />
                    </svg>
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Perfil
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      void logOut(router)
                    }}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/todo' ? 'bg-gray-500' : ''}`}
                  >
                    <svg
                      className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z' />
                      <path d='M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z' />
                      <path d='M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z' />
                    </svg>
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Log Out
                    </span>
                  </button>
                </li>
                <button
                  onClick={() => {
                    setDrop((prev) => !prev)
                  }}
                  type='button'
                  className='w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                >
                  <RightArrow></RightArrow>
                </button>
              </ul>
            </div>
          </aside>
        )}
        <div className={'h-full w-full flex-1 bg-white text-black'}>
          {children}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
