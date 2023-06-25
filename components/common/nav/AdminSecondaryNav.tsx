import { FC } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

import DropdownOptions, { OptionsDropdown } from '../DropdownOptions'
import ProfileHead from '../ProfileHead'
import useDarkMode from '@/hooks/useDarkMode'
import SearchBar from '../SearchBar'

interface Props {}

const AdminSecondaryNav: FC<Props> = (): JSX.Element => {
  const router = useRouter()
  const { toggleTheme } = useDarkMode()

  const navigateToCreateNewPost = () => router.push('/admin/posts/create')

  const handleLogOut = async () => await signOut()

  const options: OptionsDropdown = [
    {
      label: 'Add new post',
      onClick: navigateToCreateNewPost,
    },
    {
      label: 'Change theme',
      onClick: toggleTheme,
    },
    {
      label: 'Log out',
      onClick: handleLogOut,
    },
  ]

  return (
    <div className='flex items-center justify-between'>
      {/* search bar */}
      <SearchBar />

      {/* options / profile head */}
      <DropdownOptions
        head={<ProfileHead nameInitial='M' />}
        options={options}
      />
    </div>
  )
}

export default AdminSecondaryNav
