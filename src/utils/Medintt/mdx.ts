import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'

const root = process.cwd()

const getMdxSource = (slug): string => {
  return fs.readFileSync(
    path.join(root, 'public/blogs', `${slug}/${slug}.mdx`),
    'utf-8'
  )
}

export const getFiles = (): string[] => {
  return fs.readdirSync(path.join(root, 'public/blogs'))
}

export const getFileBySlug = async ({
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
  const mdxSource = getMdxSource(slug)
  const { data, content } = matter(mdxSource)
  const source = await serialize(content, {})

  return {
    source,
    frontmatter: {
      slug,
      ...data
    }
  }
}

export const getAllFilesMetadata = (): Array<{
  slug: string
}> => {
  const files = getFiles()

  return files.reduce((allPosts, postSlug) => {
    const mdxSource = getMdxSource(postSlug.replace('.mdx', ''))
    const { data } = matter(mdxSource)
    return [{ ...data, slug: postSlug.replace('.mdx', '') }, ...allPosts]
  }, [])
}
