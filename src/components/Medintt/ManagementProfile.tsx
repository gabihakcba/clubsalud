import { type ReactElement } from 'react'
import Image from 'next/image'
import { Button } from 'primereact/button'
import Span from './Span'

export default function ManagementProfile({
  src,
  name,
  description,
  socialmedia
}: {
  src: any
  name: string
  description: string
  socialmedia: Array<{ url: string; icon: string }>
}): ReactElement {
  return (
    <div className='flex flex-column gap-4 justify-content-center align-items-center white-space-normal w-20rem text-center'>
      <Image
        src={src}
        height={200}
        alt=''
        className='border-circle'
      />
      <Span type='primary' className='text-lg'>{name}</Span>
      <Span type='secondary' className='text-sm'>{description}</Span>
      <section className='flex'>
        {socialmedia.map((item, index) => (
          <Button
            key={index}
            link
            onClick={() => {
              window.open(`${item.url}`, '_blank')
            }}
            icon={item.icon}
          />
        ))}
      </section>
    </div>
  )
}
