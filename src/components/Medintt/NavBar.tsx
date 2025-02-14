'use client'

import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../../public/logos/medintt_positivo_square.png'
import { MegaMenu } from 'primereact/megamenu'
import Span from './Span'
import { Button } from 'primereact/button'

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
      <Span
        type='primary'
        className='lg:hidden'
      >
        {item.label}
      </Span>
    </a>
  )

  const itemTemplate = (item: {
    label: string
    icon: string
    url: string
  }): ReactElement => {
    return (
      <Button
        className='flex flex-align-center'
        text
        // link
        label={item.label}
        icon={item.icon}
        iconPos='right'
        onClick={() => {
          router.push(item.url)
        }}
      />
    )
  }

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
      url: '/whoarewe',
      template: itemTemplate
    },
    {
      label: 'Especialidades',
      icon: 'pi pi-list',
      url: '/specialties',
      template: itemTemplate
    },
    {
      label: 'Medicina Laboral',
      icon: 'pi pi-heart',
      url: '/occupational-medicine',
      template: itemTemplate
    },
    {
      label: 'Club Salud',
      icon: 'pi pi-th-large',
      url: '/clubsalud-info',
      template: itemTemplate
    },
    {
      label: 'Blog',
      icon: 'pi pi-book',
      url: '/blog',
      template: itemTemplate
    },
    {
      label: 'Contacto',
      icon: 'pi pi-address-book',
      url: '/contact',
      template: itemTemplate
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
