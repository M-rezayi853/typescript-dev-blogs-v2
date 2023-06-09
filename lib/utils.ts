import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { getServerSession } from 'next-auth'

import dbConnect from './dbConnect'
import Post, { PostModelSchema } from '@/models/Post'
import { PostDetail, UserProfile } from '@/utils/types'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

interface FormidablePromise<T> {
  files: formidable.Files
  body: T
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable()

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)

      resolve({ files, body: fields as T })
    })
  })
}

export const readPostsFromDb = async (
  limit: number,
  pageNo: number,
  skip?: number
) => {
  if (!limit || limit > 10)
    throw Error('Please use limit under 10 and a valid pageNo')

  const finalSkip = skip || limit * pageNo

  await dbConnect()
  const posts = await Post.find()
    .sort({ createdAt: 'desc' })
    .select('-content')
    .skip(finalSkip)
    .limit(limit)

  return posts
}

export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    thumbnail: post.thumbnail?.url || '',
    meta: post.meta,
    tags: post.tags,
    createdAt: post.createdAt.toString(),
  }))
}

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
  const user = session?.user as UserProfile

  return user && user.role === 'admin'
}
