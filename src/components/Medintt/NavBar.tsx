'use client'

import { TabMenu } from 'primereact/tabmenu'
import { useEffect, useState, type ReactElement } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../../public/logos/medintt_positivo_square.png'

export default function NavBar({
  className
}: {
  className: string
}): ReactElement {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const pathname = usePathname()
  const router = useRouter()

  const itemRenderer = (item, itemIndex: number): ReactElement => (
    <a
      className='p-menuitem-link flex align-items-center gap-2'
      onClick={() => {
        router.push('/')
        setActiveIndex(itemIndex)
      }}
    >
      <Image
        alt={item.name}
        src={logo}
        height={45}
      />
      <span className='font-bold'>{item.name}</span>
    </a>
  )

  useEffect(() => {
    const currentIndex = items.findIndex((item) => item.url === pathname)
    setActiveIndex(currentIndex)
  }, [pathname])

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
    <>
      <TabMenu
        model={items}
        className={className}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index)
        }}
      />
    </>
  )
}
