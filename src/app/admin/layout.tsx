'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type ReactElement } from 'react'
import { parse } from 'cookie'
import { logOutAccount } from 'queries/accounts'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Permissions } from 'utils/types'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PanelMenu } from 'primereact/panelmenu'
import logo from '../../../public/logos/logo_large.png'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { ScrollPanel } from 'primereact/scrollpanel'
// import socket from 'utils/websocket'
// import { getUserToken, verifyToken } from 'utils/auth'

const client = new QueryClient()

const logOut = async (router: AppRouterInstance): Promise<void> => {
  try {
    await logOutAccount()
    localStorage.removeItem('user')
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

// const manageNotification = async (data: string): Promise<void> => {
//   const token = getUserToken()
//   const user = await verifyToken(token)
//   if (JSON.parse(data).id === user?.id) {
//     alert('Nueva notificacion')
//   }
// }

export default function AdminLayout({ children }: any): ReactElement {
  const router: AppRouterInstance = useRouter()
  const [drop, setDrop] = useState<boolean>(true)

  const itemRenderer = (item, options): ReactElement => {
    // const pathname: string = usePathname()
    return (
      // <HasRole required={[Permissions[item.role]]}>
      <a
        // href={item.url}
        className='flex align-items-center px-3 py-3 cursor-pointer'
        // onClick={options.onClick}
        onClick={() => {
          if (item.url) {
            router.push(item.url as string)
          }
        }}
      >
        <span className={`${item.icon} text-primary`} />
        <span className='mx-2 font-semibold'>{item.label}</span>
        {item.badge && (
          <Badge
            className='ml-auto'
            value={item.badge}
          />
        )}
        {item.shortcut && (
          <span className='ml-auto border-1 surface-border border-round surface-100 text-xs p-1'>
            {item.shortcut}
          </span>
        )}
      </a>
      // </HasRole>
    )
  }

  useEffect(() => {
    const cookies: Record<string, string> = parse(document.cookie || '')
    if (!cookies.auth) {
      router.push('/')
    }
  }, [router])

  const items = [
    {
      label: 'Cuentas',
      icon: 'pi pi-users',
      template: itemRenderer,
      url: '/admin/accounts',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Clases y Ofertas',
      icon: 'pi pi-megaphone',
      template: itemRenderer,
      url: '/admin/classes',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Cobros',
      icon: 'pi pi-dollar',
      template: itemRenderer,
      url: '/admin/bills',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Pagos',
      icon: 'pi pi-money-bill',
      template: itemRenderer,
      url: '/admin/payments',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Asistencia',
      icon: 'pi pi-list-check',
      template: itemRenderer,
      url: '/admin',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Notificaciones',
      icon: 'pi pi-bell',
      template: itemRenderer,
      url: '/admin/notifications',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Empleados',
      icon: 'pi pi-user',
      template: itemRenderer,
      url: '/admin/employees',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Horarios',
      icon: 'pi pi-clock',
      template: itemRenderer,
      url: '/admin/schedule',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Obras sociales',
      icon: 'pi pi-heart',
      template: itemRenderer,
      url: '/admin/healthPlan',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Balances',
      icon: 'pi pi-chart-line',
      template: itemRenderer,
      url: '/admin/accounting',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      template: itemRenderer,
      url: '/admin/reports',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Perfil',
      icon: 'pi pi-id-card',
      template: itemRenderer,
      url: '/admin',
      role: [Permissions.ADM, Permissions.OWN]
    },
    {
      label: 'Salir',
      icon: 'pi pi-sign-out',
      template: itemRenderer,
      command: () => {
        void logOut(router)
      },
      role: [Permissions.ADM, Permissions.OWN]
    }
  ]
  // useEffect(() => {
  //   socket.on('notification', (data: string) => {
  //     void manageNotification(data)
  //   })
  // }, [socket])

  return (
    <QueryClientProvider client={client}>
      <div className='flex flex-row w-full'>
        <div className='flex-grow-1 h-screen z-0'>{children}</div>
        <div className='md:relative absolute'>
          {drop && (
            <ScrollPanel className='max-h-screen h-screen border-round'>
              <div className='p-2 rounded flex flex-column'>
                <Image
                  src={logo}
                  height={80}
                  alt='Club Salud'
                  className='align-self-center my-1'
                ></Image>
                <PanelMenu
                  model={items}
                  className=''
                  // pt={{ menuitem: { className: 'bg-black' } }}
                ></PanelMenu>
              </div>
            </ScrollPanel>
          )}
          <Button
            icon='pi pi-bars'
            className='fixed md:absolute top-0 right-0 md:right-100 m-2 z-5'
            onClick={() => {
              setDrop((drop) => !drop)
            }}
          ></Button>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
