import { type ReactElement } from 'react'
import BlogPreviewItem from 'components/Medintt/Blog/BlogPreviewItem'
import { getAllFilesMetadata } from 'utils/Medintt/mdx'
import Span from 'components/Medintt/Span'

export default function BlogMedintt(): ReactElement {
  const blogs = getAllFilesMetadata()
  return (
    <div className='flex flex-column align-items-center justify-content-center mx-5'>
      <Span className='font-bold text-2xl my-6' type='primary'>Blog</Span>
      <div className='flex justify-content-center flex-wrap mx-8'>
        {blogs
          ?.sort(
            (a: { slug: any; pos: number }, b: { slug: any; pos: number }) =>
              a.pos - b.pos
          )
          .map((b, i) => {
            return (
              <BlogPreviewItem
                key={i}
                item={b}
              />
            )
          })}
      </div>
    </div>
  )
}
