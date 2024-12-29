import { useTranslations } from 'next-intl'
import Link from 'next/link'
interface SidebarProps {
  activeItem: string
}

const Sidebar = ({ activeItem }: SidebarProps) => {
  const t = useTranslations('sidebar')
  const getNavItemClass = (item: string) => {
    const baseClasses = 'flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start'
    const activeClasses = 'bg-primary text-white'
    const defaultClasses =
      'hover:bg-primary hover:bg-opacity-80 hover:text-white focus:bg-primary focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'

    return `${baseClasses} ${activeItem === item ? activeClasses : defaultClasses}`
  }

  return (
    <div className='flex h-auto w-full max-w-64 flex-col bg-clip-border p-4 sticky top-20 '>
      <nav className='flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700'>
        <Link className={getNavItemClass('dashboard')} href='/user/progress'>
          <div className='grid mr-4 place-items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          {t('dashboard')}
        </Link>
        <Link role='button' className={getNavItemClass('myCourse')} href='/user/mycourses'>
          <div className='grid mr-4 place-items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          {t('myCourse')}
        </Link>
        <Link role='button' className={getNavItemClass('profile')} href='/user/profile'>
          <div className='grid mr-4 place-items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          {t('profile')}
        </Link>
        <div role='button' className={getNavItemClass('logout')}>
          <div className='grid mr-4 place-items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          {t('logout')}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
