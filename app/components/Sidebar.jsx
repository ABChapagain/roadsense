'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BiHomeAlt, BiCctv } from 'react-icons/bi'
import { MdBusAlert } from 'react-icons/md'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  // pathname to set active in navbar
  const pathname = usePathname()

  // sidebar links
  const sidebarLinks = [
    {
      id: 0,
      name: 'Home',
      icon: <BiHomeAlt className='w-5 h-5' />,
      path: '/',
    },
    {
      id: 1,
      name: 'Cctvs',
      icon: <BiCctv className='w-5 h-5' />,
      path: '/cctvs',
    },
    {
      id: 2,
      name: 'Accidents',
      icon: <MdBusAlert className='w-5 h-5' />,
      path: '/accidents',
    },
  ]

  return (
    <div className='border-r-2 flex flex-col gap-5'>
      <div className='px-10'>
        <div className='flex gap-2 items-center mt-5'>
          <Image src='/images/logo.png' alt='logo' width={70} height={70} />
          <h1 className='text-3xl font-semibold'>RoadSense</h1>
        </div>

        <div className='flex flex-col gap-5 mt-10'>
          {sidebarLinks.map((link) => (
            <Link
              href={link.path}
              key={link.id}
              className={
                'flex gap-2 items-center  rounded-full px-8 py-4 font-semibold tracking-wide ' +
                (pathname === link.path ? 'bg-green-600 text-white' : '')
              }
            >
              {link.icon}
              <h1>{link.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
