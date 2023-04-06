import { FC, useCallback, useState } from 'react'
import { BubbleMenu, Editor } from '@tiptap/react'
import { BsBoxArrowUpRight, BsPencilSquare } from 'react-icons/bs'
import { BiUnlink } from 'react-icons/bi'

import LinkForm, { LinkOption } from './LinkForm'

interface Props {
  editor: Editor
}

const EditLink: FC<Props> = ({ editor }): JSX.Element => {
  const [showEditForm, setShowEditForm] = useState(false)

  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes('link')
    if (href) {
      window.open(href, '_blank')
    }
  }, [editor])

  const handleLinkEditClick = () => {
    setShowEditForm(true)
  }

  const handleUnLinkClick = () => {
    editor.commands.unsetLink()
  }

  const handleSubmit = (link: LinkOption) => {
    const { url, openInNewTab } = link

    editor
      .chain()
      .focus()
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
      .run()

    setShowEditForm(false)
  }

  const getInitialState = useCallback(() => {
    const { href, target } = editor.getAttributes('link')
    if (href) {
      return { url: href, openInNewTab: target ? true : false }
    }
  }, [editor])

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => editor.isActive('link')}
      tippyOptions={{
        onHide: () => {
          setShowEditForm(false)
        },
      }}
    >
      <LinkForm
        visable={showEditForm}
        onSubmit={handleSubmit}
        initialState={getInitialState()}
      />

      {!showEditForm && (
        <div className='rounded bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-secondary-dark shadow-md p-3 flex items-center space-x-6 z-10'>
          <button onClick={handleOnLinkOpenClick}>
            <BsBoxArrowUpRight />
          </button>

          <button onClick={handleLinkEditClick}>
            <BsPencilSquare />
          </button>

          <button onClick={handleUnLinkClick}>
            <BiUnlink />
          </button>
        </div>
      )}
    </BubbleMenu>
  )
}

export default EditLink
