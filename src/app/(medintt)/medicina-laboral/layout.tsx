import { type ReactElement } from 'react'

export default function LaboralLayout({
  children
}: {
  children: ReactElement
}): ReactElement {
  return (
    <div className='flex flex-row justify-content-between align-items-start pr-8'>
      <img
        src='/medintt/laboral.png'
        alt=''
        className='w-16rem sm:w-18rem md:w-22rem lg:w-25rem xl:w-30rem pt-6'
      />
      <div className='w-full h-full flex justify-content-center align-items-center'>
        <div
          className='w-full min-h-30rem mx-8 border-round-3xl'
          style={{ background: '#d8d9d8' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
