import { type ReactElement } from 'react'
import specialties from '../../../utils/Medintt/ddbb/specialties.json'
import Span from 'components/Medintt/Span'
import { Divider } from 'primereact/divider'

export default function Specialties(): ReactElement {
  return (
    <div className='flex flex-column align-items-center justify-content-center'>
      <Span className='text-2xl my-6 font-bold' type='primary'>Especialidades</Span>
      <Divider/>
      <div className='flex gap-6 justify-content-around'>
        <div className='flex flex-column gap-2 w-3 align-items-center'>
          {specialties?.slice(0, 5).map((specialtie) => (
            <div
              key={specialtie.title}
              className='flex flex-column justify-content-start align-items-center'
            >
              <div className='text-blue-400 font-bold text-2xl text-center'>
                {specialtie.title}
              </div>
              {specialtie.drs?.map((dr) => <p key={dr}>- {dr}</p>)}
            </div>
          ))}
        </div>
        <div className='flex flex-column gap-2 w-3 align-items-center'>
          {specialties?.slice(5, 10).map((specialtie) => (
            <div
              key={specialtie.title}
              className='flex flex-column justify-content-start align-items-center'
            >
              <div className='text-blue-400 font-bold text-2xl text-center'>
                {specialtie.title}
              </div>
              {specialtie.drs?.map((dr) => <p key={dr}>- {dr}</p>)}
            </div>
          ))}
        </div>
        <div className='flex flex-column gap-2 w-3 align-items-center'>
          {specialties?.slice(10, 16).map((specialtie) => (
            <div
              key={specialtie.title}
              className='flex flex-column justify-content-start align-items-center'
            >
              <div className='text-blue-400 font-bold text-2xl text-center'>
                {specialtie.title}
              </div>
              {specialtie.drs?.map((dr) => <p key={dr}>- {dr}</p>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
