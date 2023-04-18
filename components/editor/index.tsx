import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import Image from '@tiptap/extension-image'
import axios from 'axios'

import Toolbar from './Toolbar'
import EditLink from './Link/EditLink'
import GalleryModal, { ImageSelectionResult } from './GalleryModal'
import SeoForm, { SeoResult } from './SeoForm'
import ActionButton from '../common/ActionButton'
import ThumbnailSelector from './ThumbnailSelector'

export interface FinalPost extends SeoResult {
  title: string
  content: string
  thumbnail?: File | string
}

interface Props {
  initialValue?: FinalPost
  btnTitle?: string
  busy?: boolean
  onSubmit(post: FinalPost): void
}

const Editor: FC<Props> = ({
  initialValue,
  btnTitle = 'Submit',
  busy = false,
  onSubmit,
}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>()
  const [showGallery, setShowGallery] = useState<boolean>(false)
  const [images, setImages] = useState<{ src: string }[]>([])
  const [uploading, setUploading] = useState<boolean>(false)
  const [post, setPost] = useState<FinalPost>({
    title: '',
    content: '',
    meta: '',
    tags: '',
    slug: '',
  })
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Type something',
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: '',
        },
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: 'mx-auto rounded',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'mx-auto',
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        )
        if (selectionRange) setSelectionRange(selectionRange)
      },
      attributes: {
        class:
          'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
      },
    },
  })

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run()
  }

  const fetchImages = async () => {
    const { data } = await axios('/api/image')
    setImages(data.images)
  }

  const handleImageUpload = async (image: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('image', image)
    const { data } = await axios.post('/api/image', formData)
    setImages([data, ...images])
    setUploading(false)
  }

  const updateTitleHandler: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setPost({ ...post, title: target.value })
  }

  const updateSeoValueHandler = (result: SeoResult) => {
    setPost({ ...post, ...result })
  }

  const updateThumbnailHandler = (file: File) => {
    setPost({ ...post, thumbnail: file })
  }

  const handleSubmit = () => {
    if (!editor) return
    onSubmit({ ...post, content: editor.getHTML() })
  }

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange)
    }
  }, [editor, selectionRange])

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue })
      editor?.commands.setContent(initialValue.content)

      const { slug, meta, tags } = initialValue

      setSeoInitialValue({ slug, meta, tags })
    }
  }, [initialValue, editor])

  return (
    <>
      <div className='p-3 dark:bg-primary-dark bg-primary transition'>
        <div className='sticky top-0 z-10 bg-primary dark:bg-primary-dark'>
          {/* Thumbnail Selector and Submit Button */}
          <div className='flex items-center justify-between mb-3'>
            <ThumbnailSelector
              onChange={updateThumbnailHandler}
              initialValue={post.thumbnail as string}
            />
            <div className='inline-block'>
              <ActionButton
                title={btnTitle}
                onClick={handleSubmit}
                busy={busy}
              />
            </div>
          </div>

          {/* Title Input */}
          <input
            className='bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3 py-2 outline-none'
            type='text'
            placeholder='Title'
            value={post.title}
            onChange={updateTitleHandler}
          />

          <Toolbar
            editor={editor}
            onOpenImageClick={() => setShowGallery(true)}
          />

          <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />
        </div>

        {editor ? <EditLink editor={editor} /> : null}

        <EditorContent className='min-h-[300px]' editor={editor} />

        <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />

        <SeoForm
          onChange={updateSeoValueHandler}
          title={post.title}
          initialValue={seoInitialValue}
        />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={images}
        onFileSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  )
}

export default Editor
