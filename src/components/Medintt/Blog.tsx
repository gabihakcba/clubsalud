import { type ReactElement } from 'react'
import BlogPreviewItem from './Blog/BlogPreviewItem'
import blog from '../../utils/Medintt/ddbb/blog.json'

export default function Blog({
  preview = false
}: {
  preview: boolean
}): ReactElement {
  const items = blog

  return (
    <div className='bg-gray-100 flex flex-column gap-4 justify-content-center align-items-center p-4'>
      <text className='text-purple-700 text-2xl font-bold'>Blog</text>
      <div className='flex flex-wrap gap-6 justify-content-center'>
        {preview && items.slice(0, 3).map((item, index) => (
          <BlogPreviewItem
            key={index}
            item={item}
          />
        ))}
        {!preview && items.map((item, index) => (
          <BlogPreviewItem
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}
