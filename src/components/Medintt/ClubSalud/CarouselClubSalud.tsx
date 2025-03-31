import { type ReactElement } from 'react'
import { Carousel } from 'primereact/carousel'

export default function CarouselClubSalud(): ReactElement {
  const products = [
    {
      name: 'Alt',
      src: 'images/cscarousel/gimnasio_01.jpg'
    },
    {
      name: 'Alt2',
      src: 'images/cscarousel/gimnasio_02.jpg'
    },
    {
      name: 'Alt3',
      src: 'images/cscarousel/gimnasio_03.jpg'
    },
    {
      name: 'Alt4',
      src: 'images/cscarousel/gimnasio_04.jpg'
    },
    {
      name: 'Alt5',
      src: 'images/cscarousel/gimnasio_05.jpg'
    },
    {
      name: 'Alt6',
      src: 'images/cscarousel/gimnasio_06.jpg'
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
    <div className='flex h-full justify-content-center align-items-center'>
      <img src={`${product.src}`} alt="" className='max-h-20rem max-w-14rem'/>
    </div>
  )

  return (
    <Carousel
      value={products}
      numVisible={1}
      numScroll={1}
      responsiveOptions={responsiveOptions}
      showIndicators={false}
      className='w-20rem'
      circular
      autoplayInterval={3000}
      itemTemplate={productTemplate}
    />
  )
}
