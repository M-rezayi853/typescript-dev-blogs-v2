import { FC, ReactNode, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { PostDetail } from '@/utils/types'
import PostCard from './PostCard'
import ConfirmModal from './ConfirmModal'
import axios from 'axios'

interface Props {
  posts: PostDetail[]
  showControls?: boolean
  hasMore: boolean
  next(): void
  dataLength: number
  loader?: ReactNode
  onPostRemoved(post: PostDetail): void
}

const InfiniteScrollPost: FC<Props> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
  onPostRemoved,
}): JSX.Element => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null)
  const [removing, setRemoving] = useState(false)

  const handleOneDeleteClick = (post: PostDetail) => {
    setPostToRemove(post)
    setShowConfirmModal(true)
  }

  const hadnleDeleteCancel = () => {
    setShowConfirmModal(false)
  }

  const handleDeleteConfirm = async () => {
    if (!postToRemove) return hadnleDeleteCancel()

    setShowConfirmModal(false)
    setRemoving(true)

    const { data } = await axios.delete(`/api/posts/${postToRemove?.id}`)

    if (data.removed) onPostRemoved(postToRemove)

    setRemoving(false)
  }

  const defaultLoader = (
    <p className='p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse'>
      Loading...
    </p>
  )

  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}
      >
        <div className='max-w-4xl mx-auto p-3'>
          <div className='grid grid-cols-3 gap-4'>
            {posts.map((post, index) => (
              <div key={post.slug}>
                <p className='text-xl absolute p-2 z-50 font-semibold'>
                  {index + 1}
                </p>

                <PostCard
                  post={post}
                  controls={showControls}
                  onDeleteClick={() => handleOneDeleteClick(post)}
                  busy={post.id === postToRemove?.id && removing}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>

      <ConfirmModal
        visible={showConfirmModal}
        title='Are you sure?'
        subTitle='This action will remove this post permanently!'
        onClose={hadnleDeleteCancel}
        onCancel={hadnleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default InfiniteScrollPost
