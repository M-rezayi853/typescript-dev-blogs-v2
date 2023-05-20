import Link from 'next/link'
import { FC } from 'react'
import { HiLightBulb } from 'react-icons/hi'

import Logo from '../Logo'
import { APP_NAME } from '../AppHead'
import { GithubAuthButton } from '@/components/button'
import ProfileHead from '../ProfileHead'
import DropdownOptions, { OptionsDropdown } from '../DropdownOptions'

interface Props {}

const UserNav: FC<Props> = (): JSX.Element => {
  const optionsDropdown: OptionsDropdown = [
    {
      label: 'Dashboard',
      onClick() {},
    },
    {
      label: 'Logout',
      onClick() {},
    },
  ]

  return (
    <div className='flex items-center justify-between bg-primary-dark p-2'>
      {/* logo */}
      <Link href={'/'} className='flex space-x-2 text-highlight-dark'>
        <Logo className='fill-highlight-dark' />
        <span className='text-xl font-semibold'>{APP_NAME}</span>
      </Link>

      <div className='flex items-center space-x-5'>
        <button className='text-secondary-light dark:text-secondary-dark'>
          <HiLightBulb size={34} />
        </button>

        <GithubAuthButton lightOnly />

        <DropdownOptions
          options={optionsDropdown}
          head={<ProfileHead nameInitial='M' lightOnly />}
        />
      </div>
    </div>
  )
}

export default UserNav
