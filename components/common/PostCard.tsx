import { FC } from 'react'
import dateformat from 'dateformat'
import Link from 'next/link'

import { PostDetail } from '@/utils/types'
import Image from 'next/image'

interface Props {
  post: PostDetail
  busy?: boolean
  onDeleteClick?(): void
  controls?: boolean
}

const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text

  return text.substring(0, trimBy).trim() + '...'
}

const PostCard: FC<Props> = ({
  post,
  busy,
  onDeleteClick,
  controls = false,
}): JSX.Element => {
  const { title, slug, meta, tags, thumbnail, createdAt } = post

  return (
    <div className='rounded shadow-sm shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary-dark transition flex flex-col f-full'>
      {/* thumbail */}
      <div className='aspect-video relative'>
        {!thumbnail ? (
          <div className='w-full h-full flex items-center justify-center text-secondary-dark opacity-59 font-semibold'>
            No image
          </div>
        ) : (
          <Image src={thumbnail} fill alt='Thumbnail' />
        )}
      </div>

      {/* post info */}
      <div className='p-2 flex flex-1 flex-col'>
        <Link href={'/' + slug}>
          <div className='flex items-center justify-between text-sm text-primary-dark dark:text-primary'>
            <div className='flex items-center space-x-1'>
              {tags.map((tag, index) => (
                <span key={tag + index}>#{tags}</span>
              ))}
            </div>

            <span>{dateformat(createdAt, 'd-mmm-yyyy')}</span>
          </div>

          <h1 className='font-semibold text-primary-dark dark:text-primary'>
            {trimText(title, 50)}
          </h1>

          <p className='text-secondary-dark'>{trimText(meta, 70)}</p>
        </Link>

        {controls && (
          <div className='flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary'>
            {busy ? (
              <span className='animate-pulse'>Removing</span>
            ) : (
              <>
                <Link
                  href={'/admin/posts/update/' + slug}
                  className='hover:underline'
                >
                  Edit
                </Link>
                <button className='hover:underline' onClick={onDeleteClick}>
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard
