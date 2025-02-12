'use client'

import { Carousel } from 'primereact/carousel'
import { type ReactElement } from 'react'
import Span from './Span'

export default function Trust(): ReactElement {
  const products = [
    {
      name: 'Boschi',
      image: '/images/clients/boschi.png'
    },
    {
      name: 'Changomas',
      image: '/images/clients/changomas.png'
    },
    {
      name: 'Cooperativa Obrera',
      image: '/images/clients/coop-obrera.png'
    },
    {
      name: 'Dinale',
      image: '/images/clients/dinale.png'
    },
    {
      name: 'Dole',
      image: '/images/clients/dole.png'
    },
    {
      name: 'El Fortin',
      image: '/images/clients/el-fortin.png'
    },
    {
      name: 'Fatima',
      image: '/images/clients/fatima.png'
    },
    {
      name: 'Gas',
      image: '/images/clients/gas.png'
    },
    {
      name: 'Hidrofrac',
      image: '/images/clients/hidrofrac.png'
    },
    {
      name: 'Hydrera',
      image: '/images/clients/hydrera.png'
    },
    {
      name: 'Kleppe',
      image: '/images/clients/kleppe.png'
    },
    {
      name: 'La Anonima',
      image: '/images/clients/la-anonima.png'
    },
    {
      name: 'Mundo 1',
      image: '/images/clients/mundo1.png'
    },
    {
      name: 'Mundo 2',
      image: '/images/clients/mundo2.png'
    },
    {
      name: 'NRG',
      image: '/images/clients/nrg.png'
    },
    {
      name: 'PB',
      image: '/images/clients/pb.png'
    },
    {
      name: 'WFS',
      image: '/images/clients/wfs-1.png'
    }
  ]

  const productTemplate = (product): ReactElement => {
    return (
      <div className='relative flex justify-content-center align-items-center h-full m-0'>
        <img
          src={product.image}
          alt=''
          className='h-3rem w-auto align-self-center p-0 m-0'
          style={{ objectFit: 'fill' }}
        />
      </div>
    )
  }

  return (
    <div className='flex flex-column justify-content-center align-items-center gap-4 p-4'>
      <Span type='primary' className='font-bold text-2xl'>Ya confían en nosotros</Span>
      <Carousel
        value={products}
        numVisible={1}
        numScroll={1}
        className='custom-carousel'
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
        contentClassName='w-30rem h-auto'
      />
    </div>
  )
}
