import { FC } from 'react'
import NextImage from 'next/image'

import CheckMark from '@/components/common/CheckMark'

interface Props {
  src: string
  selected?: boolean
  onClick?(): void
}

const Image: FC<Props> = ({ src, selected, onClick }): JSX.Element => {
  return (
    <div
      className='relative rounded overflow-hidden cursor-pointer'
      onClick={onClick}
    >
      <NextImage
        className='bg-secondary-light hover:scale-110 transition'
        src={src}
        width={200}
        height={200}
        style={{ objectFit: 'cover' }}
        alt='gallery'
      />

      <div className='absolute top-2 left-2'>
        <CheckMark visible={selected || false} />
      </div>
    </div>
  )
}

export default Image
