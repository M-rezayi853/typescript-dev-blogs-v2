import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import classnames from 'classnames'

interface Props {
  initialValue?: string
  onChange(file: File): void
}

const commonClassName =
  'border border-dashed border-secondary-dark flex items-center justify-center rounded cursor-pointer aspect-video'

const ThumbnailSelector: FC<Props> = ({
  initialValue,
  onChange,
}): JSX.Element => {
  const [selectedThumbnail, setSelectedThumbnail] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target

    if (!files) return

    const file = files[0]
    setSelectedThumbnail(URL.createObjectURL(file))
    onChange(file)
  }

  useEffect(() => {
    if (typeof initialValue === 'string') setSelectedThumbnail(initialValue)
  }, [initialValue])

  return (
    <div className='w-32'>
      <input
        type='file'
        accept='image/jpg, image/png, image/jpeg'
        id='thumbnail'
        hidden
        onChange={handleChange}
      />
      <label htmlFor='thumbnail'>
        {selectedThumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={classnames(commonClassName, 'object-cover')}
            src={selectedThumbnail}
            alt='img'
          />
        ) : (
          <PosterUI label='Thumbnail' />
        )}
      </label>
    </div>
  )
}

const PosterUI: FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => {
  return (
    <div className={classnames(commonClassName)}>
      <span>{label}</span>
    </div>
  )
}

export default ThumbnailSelector
