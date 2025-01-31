import { type ReactElement } from 'react'
import { Carousel } from 'primereact/carousel'
import Image from 'next/image'
import img1 from '../../../../public/images/cscarousel/gimnasio_01.jpg'
import img2 from '../../../../public/images/cscarousel/gimnasio_02.jpg'
import img3 from '../../../../public/images/cscarousel/gimnasio_03.jpg'
import img4 from '../../../../public/images/cscarousel/gimnasio_04.jpg'
import img5 from '../../../../public/images/cscarousel/gimnasio_05.jpg'
import img6 from '../../../../public/images/cscarousel/gimnasio_06.jpg'

export default function CarouselClubSalud(): ReactElement {
  const products = [
    {
      name: 'Alt',
      image: img1
    },
    {
      name: 'Alt2',
      image: img2
    },
    {
      name: 'Alt3',
      image: img3
    },
    {
      name: 'Alt4',
      image: img4
    },
    {
      name: 'Alt5',
      image: img5
    },
    {
      name: 'Alt6',
      image: img6
    }
  ]

  const responsiveOptions = [
    {
      breakpoint: '2000px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  const productTemplate = (product): ReactElement => (
    <div className='relative h-30rem'>
      <Image
        src={product.image}
        alt=''
        fill
        style={{ objectFit: 'contain' }} // Opciones: 'cover', 'contain', etc.
      />
    </div>
  )

  return (
    <Carousel
      value={products}
      numVisible={1}
      numScroll={1}
      responsiveOptions={responsiveOptions}
      className='custom-carousel'
      circular
      autoplayInterval={3000}
      itemTemplate={productTemplate}
    />
  )
}
