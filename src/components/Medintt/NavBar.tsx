'use client'

import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../../public/logos/medintt_positivo_square.png'
import { MegaMenu } from 'primereact/megamenu'

export default function NavBar(): ReactElement {
  const router = useRouter()

  const itemRenderer = (item, itemIndex: number): ReactElement => (
    <a
      className='p-menuitem-link flex align-items-center gap-2'
      onClick={() => {
        router.push('/')
      }}
    >
      <Image
        alt={item.name}
        src={logo}
        height={45}
      />
      <span className='font-bold block lg:hidden'>{item.name}</span>
    </a>
  )

  const items = [
    {
      label: 'Home',
      name: 'Home',
      url: '/',
      template: (item) => itemRenderer(item, 0)
    },
    {
      label: 'Quienes Somos',
      icon: 'pi pi-question',
      url: '/whoarewe'
    },
    {
      label: 'Especialidades',
      icon: 'pi pi-list',
      url: '/specialties'
    },
    {
      label: 'Medicina Laboral',
      icon: 'pi pi-heart',
      url: '/occupational-medicine'
    },
    {
      label: 'Club Salud',
      icon: 'pi pi-th-large',
      url: '/clubsalud-info'
    },
    {
      label: 'Blog',
      icon: 'pi pi-book',
      url: '/blog'
    },
    {
      label: 'Contacto',
      icon: 'pi pi-address-book',
      url: '/contact'
    }
  ]

  return (
    <MegaMenu
      model={items}
      className='m-0 sticky top-0 z-5 flex w-screen lg:justify-content-center filled shadow-2'
      orientation='horizontal'
      breakpoint='1000px'
    />
  )
}
