import ClassesCard from 'components/classes/ClassesCard'
import { type ReactElement } from 'react'

export default function Classes(): ReactElement {
  return (
    <div className='max-h-dvh max-w-dvw h-full w-full flex items-start justify-start flex-row'>
      <section
        className='h-full scrollHidden'
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(17rem,1fr))',
          gap: '0.5rem',
          alignContent: 'flex-start',
          maxHeight: '95dvh',
          overflow: 'scroll',
          margin: '2rem'
        }}
      >
        <ClassesCard />
      </section>
    </div>
  )
}
