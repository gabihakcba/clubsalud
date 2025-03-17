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
      className='flex flex-column justify-content-center align-items-center w-19rem overflow-hidden text-primary border-round-3xl'
    >
      <img src={`${src}`} alt="" className='w-full border-round-top-3xl'/>
      <div
        className='border-round-bottom-3xl p-3 shadow-4'
        style={{
          backdropFilter: 'blur(5px)',
          background:
            'linear-gradient(to bottom, rgba(177, 177, 177, 0.57), rgb(58, 58, 58))'
        }}
      >
        <div className='flex flex-column xl:flex-row align-items-center justify-content-between'>
          <span className='font-bold'>{name}</span>
          <div>
            {socialmedia.map((item, index) => (
              <Button
                key={index}
                link
                onClick={() => {
                  window.open(`${item.url}`, '_blank')
                }}
                icon={item.icon}
                style={{ color: 'var(--primary-500)' }}
              />
            ))}
          </div>
        </div>
        <span className='text-sm text-white'>{description}</span>
      </div>
    </div>
  )
}
