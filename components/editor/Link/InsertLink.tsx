import { FC, useState } from 'react'
import { BsLink45Deg } from 'react-icons/bs'

import Button from '../Toolbar/Button'
import LinkForm, { LinkOption } from './LinkForm'

interface Props {
  onSubmit(link: LinkOption): void
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visable, setVisable] = useState(false)

  const handleSubmit = (link: LinkOption) => {
    if (!link.url.trim()) return hideForm()

    onSubmit(link)
    hideForm()
  }

  const hideForm = () => setVisable(false)
  const showForm = () => setVisable(true)

  return (
    <div
      className='relative'
      onKeyDown={({ key }) => {
        if (key === 'Escape') hideForm()
      }}
    >
      <Button onClick={visable ? hideForm : showForm}>
        <BsLink45Deg />
      </Button>

      <div className='absolute top-full mt-4 z-10 right-0'>
        <LinkForm visable={visable} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default InsertLink
