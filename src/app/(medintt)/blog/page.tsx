import { type ReactElement } from 'react'
import blog from '../../../utils/Medintt/ddbb/blog.json'
import BlogPreviewItem from 'components/Medintt/Blog/BlogPreviewItem'

export default function BlogMedintt(): ReactElement {
  return (
    <div className='flex flex-column align-items-center justify-content-center'>
      <span className='font-bold text-2xl text-green-500 my-6'>Blog</span>
      <div className='flex gap-6 justify-content-center flex-wrap'>
        {blog?.map((b) => <BlogPreviewItem key={b.title} item={b} />)}
      </div>
    </div>
  )
}
