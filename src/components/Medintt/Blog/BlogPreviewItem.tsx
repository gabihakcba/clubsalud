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
      className={`w-26rem flex flex-column gap-4 justify-content-start align-items-center px-3 ${className}`}
    >
      <Image
        src={
          item.image
            ? `/blogs/${item.slug}/${item.image}`
            : '/images/no-image.png'
        }
        height={150}
        width={300}
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
