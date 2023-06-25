import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HiLightBulb } from 'react-icons/hi'
import { signIn, signOut, useSession } from 'next-auth/react'

import Logo from '../Logo'
import { APP_NAME } from '../AppHead'
import { GithubAuthButton } from '@/components/button'
import ProfileHead from '../ProfileHead'
import DropdownOptions, { OptionsDropdown } from '../DropdownOptions'
import { UserProfile } from '@/utils/types'
import useDarkMode from '@/hooks/useDarkMode'

interface Props {}

const defaultOptions: OptionsDropdown = [
  {
    label: 'Logout',
    async onClick() {
      await signOut()
    },
  },
]

const UserNav: FC<Props> = (): JSX.Element => {
  const router = useRouter()
  const { data, status } = useSession()
  const { toggleTheme } = useDarkMode()

  const profile = data?.user as UserProfile | undefined

  const isAdmin = profile && profile.role === 'admin'

  const isAuth = status === 'authenticated'

  const handleLoginWithGithub = async () => {
    const res = await signIn('github')
  }

  const optionsDropdown: OptionsDropdown = isAdmin
    ? [
        {
          label: 'Dashboard',
          onClick() {
            router.push('/admin')
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions

  return (
    <div className='flex items-center justify-between bg-primary-dark p-2'>
      {/* logo */}
      <Link href={'/'} className='flex space-x-2 text-highlight-dark'>
        <Logo className='fill-highlight-dark' />
        <span className='text-xl font-semibold'>{APP_NAME}</span>
      </Link>

      <div className='flex items-center space-x-5'>
        <button
          onClick={toggleTheme}
          className='text-secondary-light dark:text-secondary-dark'
        >
          <HiLightBulb size={34} />
        </button>

        {isAuth ? (
          <DropdownOptions
            options={optionsDropdown}
            head={<ProfileHead nameInitial='M' lightOnly />}
          />
        ) : (
          <GithubAuthButton onClick={handleLoginWithGithub} lightOnly />
        )}
      </div>
    </div>
  )
}

export default UserNav
