'use client'

import { type ReactElement } from 'react'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Span from '../Span'

export default function BlogPreviewItem({
  item,
  className
}: {
  item: any
  className?: string
}): ReactElement {
  const router: AppRouterInstance = useRouter()

  return (
    <div
      className={`flex flex-column justify-content-center align-items-center gap-2 ${className}`}
    >
      <Image
        src={
          item.image
            ? `/blogs/${item.slug}/${item.image}`
            : '/images/no-image.png'
        }
        height={100}
        width={200}
        alt=''
      />
      <Span className='font-bold text-center text-xl' type=''>{item.title}</Span>
      <Button
        className='b-0'
        label='Ver más'
        link
        onClick={() => {
          router.push(`blog/${item.slug}`)
        }}
      />
    </div>
  )
}
