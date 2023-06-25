import { FC, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

import Logo from '../Logo'

interface Props {
  navItems: {
    label: string
    icon: IconType
    href: string
  }[]
}

const NAV_OPEN_WIDTH = 'w-60'
const NAV_CLOSE_WIDTH = 'w-12'
const NAV_VISIBILITY = 'nav-visibility'

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const navRef = useRef<HTMLElement>(null)
  const [visiable, setVisiable] = useState(true)

  const toggleNav = (visibility: boolean) => {
    const { current: currentNav } = navRef
    if (!currentNav) return

    const { classList } = currentNav

    if (visibility) {
      // hide our nav
      classList.remove(NAV_OPEN_WIDTH)
      classList.add(NAV_CLOSE_WIDTH)
    } else {
      // show out nav
      classList.add(NAV_OPEN_WIDTH)
      classList.remove(NAV_CLOSE_WIDTH)
    }
  }

  const updateNavState = () => {
    toggleNav(visiable)
    const newState = !visiable
    setVisiable(newState)
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState))
  }

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY)

    if (navState !== null) {
      const newState = JSON.parse(navState)
      setVisiable(newState)
      toggleNav(!newState)
    } else {
      setVisiable(true)
    }
  }, [])

  return (
    <nav
      className='h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0'
      ref={navRef}
    >
      <div>
        <Link href={'/admin'} className='flex items-center space-x-2 p-3 mb-10'>
          <Logo className='fill-highlight-light dark:fill-highlight-dark w-5 h-5' />
          {visiable && (
            <span className='text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none'>
              Admin
            </span>
          )}
        </Link>

        <div className='space-y-6'>
          {navItems.map((item) => {
            return (
              <Tippy key={item.label} content={item.label}>
                <Link
                  href={item.href}
                  className='flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition'
                >
                  <item.icon size={24} />
                  {visiable && (
                    <span className='ml-2 leading-none'>{item.label}</span>
                  )}
                </Link>
              </Tippy>
            )
          })}
        </div>
      </div>

      <button
        className='text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition self-end'
        onClick={updateNavState}
      >
        {visiable ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  )
}

export default AdminNav
