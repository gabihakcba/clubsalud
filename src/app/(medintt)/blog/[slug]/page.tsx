'use client'

import { MDXRemote } from 'next-mdx-remote'
import { type ReactElement, useEffect, useState } from 'react'
import { getFileBySlugClient } from 'utils/Medintt/mdClient'
import Image from 'next/image'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import DownloadButton from 'components/Medintt/Blog/DownloadButton'

export default function BlogTemplate({
  params
}: {
  params: { slug: string }
}): ReactElement {
  const [source, setSource] = useState<any>(null)

  useEffect(() => {
    getFileBySlugClient({ slug: params.slug })
      .then((data) => {
        setSource(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <Card className='flex flex-column h-full bg-gray-100'>
      {source !== null && (
        <Card className='lg:px-8 lg:mx-8'>
          <MDXRemote
            compiledSource={source?.source.compiledSource}
            scope={source?.source.scope}
            frontmatter={source?.frontmatter}
            components={{ Image, Button, DownloadButton }}
          />
        </Card>
      )}
    </Card>
  )
}
