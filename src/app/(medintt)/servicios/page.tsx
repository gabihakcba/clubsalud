import { type ReactElement } from 'react'
import specialties from '../../../utils/Medintt/ddbb/specialties.json'

export default function Specialties(): ReactElement {
  return (
    <div className='flex flex-column align-items-center justify-content-center bg-primary p-4 h-full shadow-4'>
      <div
        className='grid bg-white text-primary xl:text-lg border-round-top-left-3xl xl:mx-8 xl:p-4'
        style={{ borderTopLeftRadius: '50px', borderBottomRightRadius: '50px' }}
      >
        {specialties.map((specialty) => (
          <div
            className='col-3 xl:p-2'
            key={specialty.title}
          >
            <div className='flex flex-row gap-2 xl:gap-4 align-items-center h-5rem xl:h-7rem'>
              <img src="/medintt/gota.png" alt="" className='h-1rem xl:h-2rem'/>
              <span>{specialty.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
