'use client'

import { TabMenu } from 'primereact/tabmenu'
import { useEffect, useState, type ReactElement } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../../public/logos/medintt_positivo_square.png'
import { Button } from 'primereact/button'

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
    },
    {
      template: () => (
        <div className='flex gap-2 p-menuitem-link justify-content-center align-items-center align-self-center'>
          <Button
            link
            onClick={() => {
              window.open('https://www.instagram.com/medinttcentromedico', '_blank')
            }}
            icon='pi pi-instagram'
          />
          <Button
            link
            onClick={() => {
              window.open('https://www.facebook.com/medintt', '_blank')
            }}
            icon='pi pi-facebook'
          />
          <Button
            link
            onClick={() => {
              window.open('https://www.linkedin.com/company/medintt-salud-ocupacional-integral', '_blank')
            }}
            icon='pi pi-linkedin'
          />
          <Button
            link
            onClick={() => {
              window.open('https://api.whatsapp.com/send/?phone=%2B5492994587079&text&type=phone_number&app_absent=0', '_blank')
            }}
            icon='pi pi-whatsapp'
          />
        </div>
      )
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
