import { type ReactElement } from 'react'
import Image from 'next/image'
import { Button } from 'primereact/button'

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
      <span className='text-blue-700 text-lg'>{name}</span>
      <span className='text-sm text-700'>{description}</span>
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
