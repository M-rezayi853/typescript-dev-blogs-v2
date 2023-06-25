import { FC, useEffect, useState } from 'react'

import { validateUrl } from '../EditorUtils'

interface Props {
  visable: boolean
  onSubmit(link: LinkOption): void
  initialState?: LinkOption
}

export type LinkOption = {
  url: string
  openInNewTab: boolean
}

const defaultLink = { url: '', openInNewTab: false }

const LinkForm: FC<Props> = ({
  visable,
  onSubmit,
  initialState,
}): JSX.Element | null => {
  const [link, setLink] = useState<LinkOption>(defaultLink)

  const handleSubmit = () => {
    onSubmit({ ...link, url: validateUrl(link.url) })
    resetForm()
  }

  const resetForm = () => {
    setLink({ ...defaultLink })
  }

  useEffect(() => {
    if (initialState) setLink({ ...initialState })
  }, [initialState])

  if (!visable) return null

  return (
    <div className='rounded p-2 bg-primary dark:bg-primary-dark shadow-sm shadow-secondary-dark'>
      <input
        className='bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary'
        type='text'
        placeholder='https://example.com'
        autoFocus
        value={link.url}
        onChange={({ target }) => setLink({ ...link, url: target.value })}
      />

      <div className='flex items-center space-x-2 mt-2'>
        <input
          type='checkbox'
          id='open-in-new-tap'
          checked={link.openInNewTab}
          onChange={({ target }) =>
            setLink({ ...link, openInNewTab: target.checked })
          }
        />
        <label
          className='text-sm text-secondary-dark dark:text-secondary-light'
          htmlFor='open-in-new-tap'
        >
          open in new tab
        </label>

        <div className='text-right flex-1'>
          <button
            className='bg-action px-2 py-1 text-sm text-primary rounded'
            onClick={handleSubmit}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default LinkForm
