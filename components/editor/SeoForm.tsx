import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import classnames from 'classnames'
import slugify from 'slugify'

export interface SeoResult {
  meta: string
  slug: string
  tags: string
}

interface Props {
  title?: string
  onChange(result: SeoResult): void
  initialValue?: SeoResult
}

const commonInput =
  'w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition p-2 text-primary-dark dark:text-primary'

const SeoForm: FC<Props> = ({
  title = '',
  onChange,
  initialValue,
}): JSX.Element => {
  const [values, setValues] = useState({ meta: '', slug: '', tags: '' })

  const { meta, slug, tags } = values

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    let { name, value } = target

    if (name === 'meta') value = value.substring(0, 150)

    const newValues = { ...values, [name]: value }

    setValues(newValues)
    onChange(newValues)
  }

  useEffect(() => {
    const slug = slugify(title.toLowerCase())
    const newValues = { ...values, slug }
    setValues(newValues)
    onChange(newValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  useEffect(() => {
    if (initialValue) {
      setValues({ ...initialValue, slug: slugify(initialValue.slug) })
    }
  }, [initialValue])

  return (
    <div className='space-y-4'>
      <h1 className='text-primary-dark dark:text-primary text-xl font-semibold '>
        SEO Section
      </h1>

      <Input
        name='slug'
        label='Slug:'
        placeholder='slug-goes-here'
        value={slug}
        onChange={handleChange}
      />
      <Input
        name='tags'
        label='Tags:'
        placeholder='React, Next JS'
        value={tags}
        onChange={handleChange}
      />

      <div className='relative'>
        <textarea
          className={classnames(commonInput, 'text-xl h-20 resize-none')}
          name='meta'
          placeholder='Meta description'
          value={meta}
          onChange={handleChange}
        ></textarea>

        <p className='absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm'>
          {meta.length}/150
        </p>
      </div>
    </div>
  )
}

const Input: FC<{
  name?: string
  value?: string
  placeholder?: string
  label?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}> = ({ name, value, placeholder, label, onChange }): JSX.Element => {
  return (
    <label className='block relative'>
      <span className='absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2'>
        {label}
      </span>
      <input
        className={classnames(commonInput, 'italic pl-12')}
        type='text'
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export default SeoForm
