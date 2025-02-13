import { type ReactElement } from 'react'
import BlogPreviewItem from 'components/Medintt/Blog/BlogPreviewItem'
import { getAllFilesMetadata } from 'utils/Medintt/mdx'
import Span from 'components/Medintt/Span'

export default function BlogMedintt(): ReactElement {
  const blogs = getAllFilesMetadata()

  return (
    <div className='flex flex-column align-items-center justify-content-center mx-5'>
      <Span
        className='font-bold text-2xl my-6'
        type='primary'
      >
        Blog
      </Span>
      <div className='grid'>
        {blogs
          ?.sort(
            (a: { slug: any; pos: number }, b: { slug: any; pos: number }) =>
              a.pos - b.pos
          )
          .map((b, i) => {
            return (
              <div
                className='col-12 md:col-6 lg:col-4'
                key={i}
              >
                <BlogPreviewItem item={b} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
