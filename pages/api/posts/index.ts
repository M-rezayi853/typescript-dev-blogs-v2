import { NextApiHandler } from 'next'
import formidable from 'formidable'

import dbConnect from '../../../lib/dbConnect'
import { postValidationSchema, validateSchema } from '@/lib/validator'
import { formatPosts, readFile, readPostsFromDb } from '@/lib/utils'
import Post from '@/models/Post'
import cloudinary from '@/lib/cloudinary'
import { IncomingPost } from '@/utils/types'

export const config = {
  api: { bodyParser: false },
}

const handler: NextApiHandler = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return readPosts(req, res)

    case 'POST':
      return createNewPost(req, res)
  }
}

const createNewPost: NextApiHandler = async (req, res) => {
  const { files, body } = await readFile<IncomingPost>(req)

  let tags = []
  if (body.tags) tags = JSON.parse(body.tags as string)

  const error = validateSchema(postValidationSchema, { ...body, tags })

  if (error) {
    res.status(400).json({ error })
  }

  const { title, content, slug, meta } = body

  await dbConnect()
  const alreadyExists = await Post.findOne({ slug })

  if (alreadyExists)
    return res.status(400).json({ error: 'Slug need to be unique!' })

  // create new post
  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  })

  // uploading thumbnail if there is any
  const thumbnail = files.thumbnail as formidable.File
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: 'dev-blogs',
      }
    )

    newPost.thumbnail = { url, public_id }
  }

  await newPost.save()

  res.json({ post: newPost })
}

const readPosts: NextApiHandler = async (req, res) => {
  try {
    const { limit, pageNo } = req.query as { limit: string; pageNo: string }

    const posts = await readPostsFromDb(parseInt(limit), parseInt(pageNo))

    res.json({ posts: formatPosts(posts) })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default handler
