import { type ReactElement } from 'react'
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
    <div
      className='flex flex-column justify-content-center align-items-center w-19rem overflow-hidden text-primary border-round-3xl h-full'
    >
      <img src={`${src}`} alt="" className='w-full border-round-top-3xl'/>
      <div
        className='border-round-bottom-3xl p-3 shadow-4 h-full'
        style={{
          backdropFilter: 'blur(5px)',
          background:
            'linear-gradient(to bottom, rgba(90, 90, 90, 0.57), rgb(58, 58, 58))'
        }}
      >
        <div className='flex flex-column xl:flex-row align-items-center justify-content-between'>
          <span className='font-bold text-white'>{name}</span>
          <div>
            {socialmedia.map((item, index) => (
              <Button
                key={index}
                link
                onClick={() => {
                  window.open(`${item.url}`, '_blank')
                }}
                icon={item.icon}
                style={{ color: 'white' }}
              />
            ))}
          </div>
        </div>
        <span className='text-sm text-white'>{description}</span>
      </div>
    </div>
  )
}
