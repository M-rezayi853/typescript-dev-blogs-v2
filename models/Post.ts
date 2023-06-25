import { Schema, model, models, ObjectId, Model } from 'mongoose'

export interface PostModelSchema {
  _id: ObjectId
  title: string
  slug: string
  content: string
  meta: string
  tags: string[]
  thumbnail: { url: string; public_id: string }
  createdAt: Date
  author: ObjectId
}

const PostSchema = new Schema<PostModelSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
    meta: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Post = models?.Post || model('Post', PostSchema)
export default Post as Model<PostModelSchema>
