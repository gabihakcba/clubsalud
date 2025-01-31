'use client'

import { type ReactElement } from 'react'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export default function BlogPreviewItem({ item }: { item: any }): ReactElement {
  const router: AppRouterInstance = useRouter()

  return (
    <div className='w-30rem flex flex-column gap-4 justify-content-center align-items-center'>
      <Image
        src={item.image}
        height={180}
        width={400}
        alt=''
      />
      <span className='font-bold text-center text-xl'>{item.title}</span>
      <span className='text-700'>{item.content.slice(0, 400)} [...]</span>
      <Button
        label='Ver más'
        link
        disabled
        onClick={() => {
          router.push(`blog/${item.id}`)
        }}
      />
    </div>
  )
}
