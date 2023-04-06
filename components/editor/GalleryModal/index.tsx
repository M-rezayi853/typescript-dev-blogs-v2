import { ChangeEventHandler, FC, useState, useCallback } from 'react'
import Image from 'next/image'
import { AiOutlineCloudUpload } from 'react-icons/ai'

import ModalContainer, { ModalProps } from '@/components/common/ModalContainer'
import Gallery from './Gallery'
import ActionButton from '@/components/common/ActionButton'

export interface ImageSelectionResult {
  src: string
  altText: string
}

interface Props extends ModalProps {
  onFileSelect(image: File): void
  onSelect(result: ImageSelectionResult): void
}

const images = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
  {
    src: 'https://www.whoa.in/download/sparrow-image-photo-taken-at-the-right-moment-hd-wallpaper',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Leucanthemum_vulgare_%27Filigran%27_Flower_2200px.jpg/1320px-Leucanthemum_vulgare_%27Filigran%27_Flower_2200px.jpg',
  },
  {
    src: 'https://avatars.mds.yandex.net/i?id=e67c20f98bdc512c5d3bc20c140f8fac-5719595-images-taas-consumers&n=27&h=480&w=480',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Leucanthemum_vulgare_%27Filigran%27_Flower_2200px.jpg/1320px-Leucanthemum_vulgare_%27Filigran%27_Flower_2200px.jpg',
  },
  {
    src: 'https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=360',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Leucanthemum_vulgare_%27Filigran%27_Flower_2200px.jpg/1320px-Leucanthemum_vulgare_%27Filigran%27_Flower_2200px.jpg',
  },
  {
    src: 'https://images.all-free-download.com/images/graphiclarge/nice_flower_204852.jpg',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
]

const GalleryModal: FC<Props> = ({
  visible,
  onClose,
  onFileSelect,
  onSelect,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState('')
  const [altText, setAltText] = useState('')

  const handleClose = useCallback(() => {
    onClose && onClose()
  }, [onClose])

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target

    if (!files) return

    const file = files[0]
    if (!file.type.startsWith('image')) return handleClose()

    onFileSelect(file)
  }

  const handleSelection = () => {
    if (!selectedImage) return handleClose()
    onSelect({ src: selectedImage, altText })
    handleClose()
  }

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className='max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded'>
        <div className='flex'>
          {/* gallery */}
          <div className='basis-[75%] max-h-[450px] overflow-y-auto'>
            <Gallery
              images={images}
              selectedImage={selectedImage}
              onSelect={(src) => setSelectedImage(src)}
            />
          </div>

          {/* image selection and upload */}
          <div className='basis-1/4 px-2'>
            <div className='space-y-4'>
              <div>
                <input
                  hidden
                  type='file'
                  id='image-input'
                  onChange={handleOnImageChange}
                />
                <label htmlFor='image-input'>
                  <div className='w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded'>
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>

              {selectedImage ? (
                <>
                  <textarea
                    className='resize-none w-full bg-transparent rounded border-2 border-secondary-dark focus:ring-1 text-primary dark:text-primary-dark h-32 p-1'
                    placeholder='Alt text'
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>

                  <ActionButton title='Select' onClick={handleSelection} />

                  <div className='relative aspect-video bg-png-pattern'>
                    <Image
                      src={selectedImage}
                      fill
                      style={{ objectFit: 'contain' }}
                      alt=''
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default GalleryModal