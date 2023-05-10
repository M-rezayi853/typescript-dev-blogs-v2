import { FC, ReactNode } from 'react'
import Link from 'next/link'
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFileAdd,
} from 'react-icons/ai'

import AdminNav from '../common/AdminNav'
import AppHead from '../common/AppHead'

interface Props {
  children: ReactNode
  title?: string
}

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'Dashborad' },
  { href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
  { href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
  { href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
  { href: '/admin/contact', icon: AiOutlineContacts, label: 'Contact' },
]

const AdminLayout: FC<Props> = ({ children, title }): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className='flex'>
        <AdminNav navItems={navItems} />

        <div className='flex-1 p-4'>{children}</div>

        <Link
          href={'/admin/posts/create'}
          className='bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition'
        >
          <AiOutlineFileAdd size={24} />
        </Link>
      </div>
    </>
  )
}

export default AdminLayout
