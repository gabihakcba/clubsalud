'use client'

import { type ReactElement } from 'react'
import { Carousel } from 'primereact/carousel'
import { Button } from 'primereact/button'

export default function CarouselMedintt(): ReactElement {
  const products = [
    {
      name: 'pacientes'
    },
    {
      name: 'empresas'
    }
  ]

  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 2
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 2
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 2
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 2
    }
  ]

  const productTemplate = (product): ReactElement => {
    if (product.name === 'pacientes') {
      return (
        <div className='font-secondary flex flex-row gap-7 h-full w-full justify-content-center align-items-center'>
          <img
            src={`/medintt/${product.name}.png`}
            alt='Empresas'
            className='h-10rem sm:h-20rem md:h-25rem lg:h-30rem'
          />
          <div className='flex flex-column justify-content-center gap-3'>
            <span className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary'>
              Para pacientes
            </span>
            <span className='w-10rem sm:w-15rem xl:w-25rem text-color-secondary'>
              Accedé a atención médica integral y personalizada.
              <ul
                style={{ listStyle: 'none' }}
                className='p-0'
              >
                <li>📌 Consultas médicas</li>
                <li>📌 Chequeos preventivos</li>
                <li>📌 Rehabilitación y bienestar emocional</li>
              </ul>
            </span>
            <Button
              label='‍👨‍⚕️ Solicitar turno'
              className='w-max align-self-center border-round-xl px-4'
            />
          </div>
        </div>
      )
    } else if (product.name === 'empresas') {
      return (
        <div className='flex flex-row gap-7 h-full w-full justify-content-center align-items-center'>
          <img
            src={`/medintt/${product.name}.png`}
            alt='Empresas'
            className='h-10rem sm:h-20rem md:h-25rem lg:h-30rem'
          />
          <div className='flex flex-column justify-content-center gap-3'>
            <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary'>
              Para empresas
            </span>
            <span className='w-10rem sm:w-15rem xl:w-25rem text-color-secondary'>
              Protegé tu equipo y aumentá la productividad. Diseñamos planes
              personalizados para el bienestar laboral, cumpliendo normativas y
              reduciendo riegos.
              <ul
                style={{ listStyle: 'none' }}
                className='p-0'
              >
                <li>📌 Consultorial en salud ocupacional</li>
                <li>📌 Programas de prevención y bienestar</li>
                <li>📌 Evaluaciones médicas y certificaciones</li>
              </ul>
            </span>
            <Button
              label='‍💼 Solicitar una consultoría'
              className='w-max align-self-center border-round-xl px-4'
            />
          </div>
        </div>
      )
    }
    return <></>
  }

  return (
    <Carousel
      value={products}
      numVisible={1}
      numScroll={2}
      responsiveOptions={responsiveOptions}
      itemTemplate={productTemplate}
      circular
      className='my-7'
      showIndicators={false}
      nextIcon={
        <img
          src='/medintt/next.png'
          className='w-1rem lg:w-2rem'
        />
      }
      prevIcon={
        <img
          src='/medintt/prev.png'
          className='w-1rem lg:w-2rem'
        />
      }
    />
  )
}
