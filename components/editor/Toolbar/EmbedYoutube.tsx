import { FC, useState } from 'react'
import { BsYoutube } from 'react-icons/bs'

import Button from '../Toolbar/Button'

interface Props {
  onSubmit(link: string): void
}

const EmbedYoutube: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const handleSubmit = () => {
    if (!url.trim()) return hideForm()

    onSubmit(url)
    setUrl('')
    hideForm()
  }

  const hideForm = () => setVisible(false)
  const showForm = () => setVisible(true)

  return (
    <div
      className='relative'
      onKeyDown={({ key }) => {
        if (key === 'Escape') hideForm()
      }}
    >
      <Button onClick={visible ? hideForm : showForm}>
        <BsYoutube />
      </Button>

      {visible && (
        <div className='absolute top-full mt-4 z-10 right-0'>
          <div className='rounded p-2 bg-primary dark:bg-primary-dark shadow-sm shadow-secondary-dark'>
            <div className='flex space-x-2'>
              <input
                className='bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary'
                type='text'
                placeholder='https://youtube.com'
                autoFocus
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />

              <button
                className='bg-action p-2 text-sm text-primary rounded'
                onClick={handleSubmit}
              >
                Embed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmbedYoutube
