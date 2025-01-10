import { type ReactElement } from 'react'
import Image from 'next/image'

export default function BlogPreviewItem({ item }: { item: any }): ReactElement {
  return (
    <div className='w-30rem flex flex-column gap-4 justify-content-center align-items-center'>
      <Image src={item.image} height={200} width={400} alt=''/>
      <span className='font-bold text-center text-xl'>{item.title}</span>
      <span className='text-700'>{item.content}</span>
    </div>
  )
}
