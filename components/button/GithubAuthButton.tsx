import { FC, useCallback } from 'react'
import classNames from 'classnames'
import { AiFillGithub } from 'react-icons/ai'

interface Props {
  lightOnly?: boolean
  onClick?(): void
}

const commonClasses =
  'flex items-center justify-center space-x-1 px-3 py-2 rounded transition hover:scale-[0.97] duration-100'

export const GithubAuthButton: FC<Props> = ({
  lightOnly,
  onClick,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    if (lightOnly) return 'text-primary-dark bg-primary'

    return 'bg-primary-dark dark:bg-primary text-primary dark:text-primary-dark'
  }, [lightOnly])

  return (
    <button className={classNames(commonClasses, getStyle())} onClick={onClick}>
      <span>Continue with</span>
      <AiFillGithub size={24} />
    </button>
  )
}
