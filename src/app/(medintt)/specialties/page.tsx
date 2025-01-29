import { type ReactElement } from 'react'
import specialties from '../../../utils/Medintt/ddbb/specialties.json'

export default function Specialties(): ReactElement {
  return (
    <div className='flex flex-column align-items-center justify-content-center'>
      <span className='font-bold text-2xl text-green-500 my-6'>Especialidades</span>
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
