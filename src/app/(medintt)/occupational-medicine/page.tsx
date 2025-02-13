import { Divider } from 'primereact/divider'
import { type ReactElement } from 'react'
import img from '../../../../public/images/medicina-laboral-fondo-1.jpg'
import Image from 'next/image'
import AccordionOccupational from 'components/Medintt/occupational/AccordionOccupational'
import Span from 'components/Medintt/Span'

export default function OccupationalMedicine(): ReactElement {
  return (
    <div className='mx-4 px-4 lg:mx-8 lg:px-8'>
      <div className='flex flex-column align-items-center justify-content-center'>
        <Span
          className='font-bold text-2xl my-6 text-center'
          type='primary'
        >
          Medicina Laboral
        </Span>
        <Divider className='m-0 p-0' />
        <p className='font-bold text-center'>
          Con más de 10 años de experiencia, Medintt asesora y acompaña
          estratégicamente a las empresas e instituciones para desarrollar su
          potencial y respaldar la capacidad productiva de su personal y
          colaboradores.
        </p>
        <Divider className='m-2 p-0' />
        <div className='flex flex-column align-items-center lg:flex-row lg:justify-content-center lg:align-items-start w-full mt-4'>
          <Image
            src={img}
            height={350}
            alt=''
            className='w-20rem md:w-25rem lg:w-auto'
            // fill
            style={{ objectFit: 'contain' }} // Opciones: 'cover', 'contain', etc.
          />
          <div className='w-20rem md:w-25rem lg:w-30rem my-4 lg:my-0'>
            <AccordionOccupational />
          </div>
        </div>
      </div>
    </div>
  )
}
