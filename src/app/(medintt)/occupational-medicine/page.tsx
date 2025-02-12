import { Divider } from 'primereact/divider'
import { type ReactElement } from 'react'
import img from '../../../../public/images/medicina-laboral-fondo-1.jpg'
import Image from 'next/image'
import AccordionOccupational from 'components/Medintt/occupational/AccordionOccupational'
import Span from 'components/Medintt/Span'

export default function OccupationalMedicine(): ReactElement {
  return (
    <div className='mx-8 px-8'>
      <div className='flex flex-column align-items-center justify-content-center mx-8 px-8'>
        <Span
          className='font-bold text-2xl my-6'
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
        <div className='flex justify-content-center align-items-start w-full'>
          <div className=''>
            <Image
              src={img}
              height={500}
              alt=''
              // fill
              style={{ objectFit: 'contain' }} // Opciones: 'cover', 'contain', etc.
            />
          </div>
          <div className='w-30rem'>
            <AccordionOccupational />
          </div>
        </div>
      </div>
    </div>
  )
}
