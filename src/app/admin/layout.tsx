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
import { hasPermission } from 'utils/auth'
import { type MenuItem } from 'primereact/menuitem'
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

const itemRenderer = (item, options): ReactElement => {
  return (
    <a
      href={item.url}
      className='flex align-items-center px-3 py-3 cursor-pointer no-underline text-white'
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
  )
}

const getItems = async (setItems, router: AppRouterInstance): Promise<void> => {
  const items = [
    {
      label: 'Cuentas',
      icon: 'pi pi-users',
      template: itemRenderer,
      url: '/admin/accounts',
      show: await hasPermission([Permissions.ADM, Permissions.OWN])
    },
    {
      label: 'Clases y Ofertas',
      icon: 'pi pi-megaphone',
      template: itemRenderer,
      url: '/admin/classes',
      show: await hasPermission([
        Permissions.ADM,
        Permissions.OWN,
        Permissions.MEM
      ])
    },
    {
      label: 'Asistencia',
      icon: 'pi pi-calendar',
      template: itemRenderer,
      url: '/admin/attendance',
      show: await hasPermission([Permissions.ADM, Permissions.OWN])
    },
    {
      label: 'Suscripciones',
      icon: 'pi pi-list-check',
      template: itemRenderer,
      url: '/admin/subscriptions',
      show: await hasPermission([Permissions.ADM, Permissions.OWN])
    },
    {
      label: 'Cobros',
      icon: 'pi pi-dollar',
      template: itemRenderer,
      url: '/admin/bills',
      show: await hasPermission([Permissions.ADM, Permissions.OWN])
    },
    {
      label: 'Pagos',
      icon: 'pi pi-money-bill',
      template: itemRenderer,
      url: '/admin/payments',
      show: await hasPermission([Permissions.ADM, Permissions.OWN])
    },
    {
      label: 'Notificaciones',
      icon: 'pi pi-bell',
      template: itemRenderer,
      url: '/admin/notifications',
      show: await hasPermission([
        Permissions.ADM,
        Permissions.OWN,
        Permissions.INS,
        Permissions.MEM,
        Permissions.OTHER
      ])
    },
    {
      label: 'Empleados',
      icon: 'pi pi-user',
      template: itemRenderer,
      url: '/admin/employees',
      show: await hasPermission([Permissions.ADM, Permissions.OWN])
    },
    {
      label: 'Horarios',
      icon: 'pi pi-clock',
      template: itemRenderer,
      url: '/admin/schedule',
      show: await hasPermission([
        Permissions.ADM,
        Permissions.OWN,
        Permissions.INS,
        Permissions.MEM
      ])
    },
    {
      label: 'Obras sociales',
      icon: 'pi pi-heart',
      template: itemRenderer,
      url: '/admin/healthPlan',
      show: await hasPermission([Permissions.OWN])
    },
    {
      label: 'Balances',
      icon: 'pi pi-chart-line',
      template: itemRenderer,
      url: '/admin/accounting',
      show: await hasPermission([Permissions.OWN])
    },
    {
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      template: itemRenderer,
      url: '/admin/reports',
      show: await hasPermission([Permissions.OWN, Permissions.ADM])
    },
    {
      label: 'Perfil',
      icon: 'pi pi-id-card',
      template: itemRenderer,
      url: '/admin',
      show: await hasPermission([
        Permissions.ADM,
        Permissions.OWN,
        Permissions.INS,
        Permissions.MEM,
        Permissions.OTHER
      ])
    },
    {
      label: 'Herramientas',
      icon: 'pi pi-wrench',
      template: itemRenderer,
      url: '/admin/tools',
      show: await hasPermission([Permissions.OWN])
    },
    {
      label: 'Salir',
      icon: 'pi pi-sign-out',
      template: itemRenderer,
      command: () => {
        void logOut(router)
      },
      show: await hasPermission([
        Permissions.ADM,
        Permissions.OWN,
        Permissions.INS,
        Permissions.MEM,
        Permissions.OTHER
      ])
    }
  ]
  setItems(items.filter((item) => item.show))
}

export default function AdminLayout({ children }: any): ReactElement {
  const router: AppRouterInstance = useRouter()
  const [drop, setDrop] = useState<boolean>(false)
  const [items, setItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const cookies: Record<string, string | undefined> = parse(
      document.cookie || ''
    )
    if (!cookies.auth) {
      router.push('/')
    }
    void getItems(setItems, router)
  }, [router])

  return (
    <QueryClientProvider client={client}>
      <div className='flex flex-row w-full'>
        <div className='flex-grow-1 h-screen z-0'>{children}</div>
        <div className='md:relative absolute'>
          {drop && (
            <ScrollPanel className='max-h-screen h-screen bg-primary-reverse'>
              <div className='p-2 rounded flex flex-column'>
                <Image
                  src={logo}
                  height={80}
                  alt='Club Salud'
                  className='align-self-center my-1  border-round-lg'
                />
                <PanelMenu
                  model={items}
                  className=''
                  // pt={{ menuitem: { className: 'bg-black' } }}
                />
              </div>
            </ScrollPanel>
          )}
          <Button
            icon='pi pi-bars'
            className='fixed md:absolute top-0 right-0 md:right-100 m-2 z-5'
            onClick={() => {
              setDrop((drop) => !drop)
            }}
          />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
