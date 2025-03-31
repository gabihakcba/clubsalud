'use client'

import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MegaMenu } from 'primereact/megamenu'
import { Button } from 'primereact/button'
import logo from '../../../public/logos/medintt_positivo_rectangle.png'

export default function NavBar(): ReactElement {
  const router = useRouter()

  const itemRenderer = (): ReactElement => (
    <a
      className='p-menuitem-link flex align-items-center gap-2'
      onClick={() => {
        router.push('/')
      }}
    >
      <Image
        alt={'Home'}
        src={logo}
        height={70}
      />
    </a>
  )

  const itemTemplate = (item: { label: string; url: string }): ReactElement => {
    return (
      <Button
        className={'flex flex-align-center text-primary'}
        text
        // link
        label={item.label}
        onClick={() => {
          item?.url && router.push(item.url)
        }}
        icon={!item?.url && 'pi pi-angle-down'}
        iconPos='right'
      />
    )
  }

  const subitemTemplate = (item: {
    label: string
    url: string
  }): ReactElement => {
    return (
      <div className='border-bottom-1 border-primary'>
        <Button
          className='text-left'
          text
          // link
          onClick={() => {
            router.push(item.url)
          }}
        >
          <p className='p-0 m-0'>{item.label}</p>
        </Button>
      </div>
    )
  }

  const items = [
    {
      label: 'Nosotros',
      url: '/nosotros',
      template: itemTemplate
    },
    {
      label: 'Servicios',
      url: '/servicios',
      template: itemTemplate
    },
    {
      label: 'Medicina Laboral',
      template: itemTemplate,
      items: [
        {
          label: 'Para Empresas',
          template: itemTemplate,
          items: [
            {
              label: 'Exámenes de salud',
              url: '/medicina-laboral/empresas/examenes-salud',
              template: subitemTemplate
            },
            {
              label: 'Ausentismo',
              url: '/medicina-laboral/empresas/ausentismo',
              template: subitemTemplate
            },
            {
              label: 'Subespecialidades',
              url: '/medicina-laboral/empresas/subespecialidades',
              template: subitemTemplate
            },
            {
              label: 'Servicio integral de salud laboral',
              url: '/medicina-laboral/empresas/salud-laboral',
              template: subitemTemplate
            },
            {
              label: 'Capacitaciones',
              url: '/medicina-laboral/empresas/capacitaciones',
              template: subitemTemplate
            },
            {
              label: 'Higiene y Seguridad',
              url: '/medicina-laboral/empresas/higiene-y-seguridad',
              template: subitemTemplate
            },
            {
              label: 'Campañas de Vacunación',
              url: '/medicina-laboral/empresas/campanas-vacunacion',
              template: subitemTemplate
            }
          ]
        },
        {
          label: 'Para ART',
          template: itemTemplate,
          items: [
            {
              label: 'Exámenes periódicos',
              url: '/medicina-laboral/art/examenes-periodicos',
              template: subitemTemplate
            },
            {
              label: 'Accidentología',
              url: '/medicina-laboral/art/accidentologia',
              template: subitemTemplate
            }
          ]
        }
      ]
    },
    {
      label: 'Club Salud',
      url: '/clubsalud-info',
      template: itemTemplate
    },
    {
      label: 'Campus Virtual',
      url: '/campus-virtual',
      template: itemTemplate
    },
    {
      label: 'Contacto',
      url: '/contact',
      template: itemTemplate
    }
  ]

  return (
    <MegaMenu
      model={items}
      start={itemRenderer}
      className='m-0 fixed top-0 z-5 flex w-screen lg:justify-content-around filled shadow-2'
      orientation='horizontal'
      breakpoint='1000px'
    />
  )
}
