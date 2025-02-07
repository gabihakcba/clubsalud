import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { path } from 'utils/ClubSalud/path'
import remarkGfm from 'remark-gfm'

const getMdxSourceClient = async (slug): Promise<Response> => {
  const data = await fetch(`${path()}/blogs/${slug}/${slug}.mdx`)
  return data
}

export const getFileBySlugClient = async ({
  slug
}): Promise<{
  source: MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
  >
  frontmatter: {
    slug: any
  }
}> => {
  const mdxSource = await (await getMdxSourceClient(slug)).text()
  const { data, content } = matter(mdxSource)
  const source = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm] }
  })
  return {
    source,
    frontmatter: {
      slug,
      ...data
    }
  }
}
