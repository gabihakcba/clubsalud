import { Divider } from 'primereact/divider'
import { type ReactElement } from 'react'

export default function Contact(): ReactElement {
  return (
    <div className='flex flex-column align-items-center justify-content-center'>
      <span className='font-bold text-2xl text-green-500 my-6'>
        Contacto
      </span>
      <Divider/>
    </div>
  )
}
