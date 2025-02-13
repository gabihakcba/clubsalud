import { type ReactElement } from 'react'
import specialties from '../../../utils/Medintt/ddbb/specialties.json'
import Span from 'components/Medintt/Span'
import { Divider } from 'primereact/divider'

export default function Specialties(): ReactElement {
  return (
    <div className='flex flex-column align-items-center justify-content-center'>
      <Span
        className='text-2xl my-6 font-bold'
        type='primary'
      >
        Especialidades
      </Span>
      <Divider />
      <div className='grid mx-8'>
        {specialties?.map((specialtie) => (
          <div
            key={specialtie.title}
            className='col-12 md:col-6 lg:col-4 text-center'
          >
            <div className='text-blue-400 font-bold text-2xl text-center'>
              {specialtie.title}
            </div>
            {specialtie.drs?.map((dr) => <p key={dr}>- {dr}</p>)}
          </div>
        ))}
      </div>
    </div>
  )
}
