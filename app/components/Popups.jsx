'use client'
import { set } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import useSound from 'use-sound'
import warning from '../warning.mp3'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function Popups() {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)
  const router = useRouter()

  const [show, setShow] = useState(false)
  const [play, { stop, pause }] = useSound(warning)
  const [accident, setAccident] = useState({})

  useEffect(() => {
    socket.on('receive-message', (message) => {
      if (message) {
        setAccident(message)
        setShow(true)
        play()
      }

      // here
    })
  }, [])

  return (
    <div
      onMouseEnter={() => play()}
      className={`min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${
        show ? 'block' : 'hidden'
      }`}
      style={{ backgroundImage: 'url()' }}
      id='modal-id'
    >
      <div className='absolute bg-black opacity-80 inset-0 z-0'></div>
      <div className='w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white'>
        {/*content*/}
        <div className=''>
          {/*body*/}
          <div className='text-center p-5 flex-auto justify-center'>
            <div className='flex w-full justify-center items-center'>
              <img
                src='https://th.bing.com/th/id/OIP.NBRhdDu3xPQP6dqq0kauPgHaHa?pid=ImgDet&rs=1'
                className='h-20 w-20'
                alt='warning'
              />
            </div>
            <h2 className='text-xl font-bold py-4'>
              Accident Detected at{' '}
              <span className='text-red-500 inline-block'>
                {accident?.cctv?.city}
              </span>
            </h2>
            <p className='text-sm text-gray-500 px-8 mb-2'>
              Camera Ip:{' '}
              <a className='text-blue-500' href={accident?.cctv?.ipAddress}>
                {accident?.cctv?.ipAddress}
              </a>
            </p>
            <p className='text-sm text-gray-500 px-8 mb-2'>
              Please click on view details to view the details of the accident.
            </p>

            <div className='flex justify-center'>
              <Image
                src={`/../${accident?.photos}`}
                alt='accident image'
                width={300}
                height={300}
                className='rounded-lg '
              />
            </div>
          </div>
          {/*footer*/}

          <div className='p-3 mt-2 text-center space-x-4 md:block'>
            <button
              onClick={() => {
                setShow(false)
                pause()
                router.refresh()
              }}
              className='mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShow(false)
                pause()
                router.push(`/accidents/${accident._id}`)
                router.refresh()
              }}
              className='mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm
              font-medium tracking-wider border text-gray-600 rounded-full
              hover:shadow-lg hover:bg-gray-100'
            >
              {' '}
              View Details
            </button>
          </div>
        </div>
      </div>
      {/* audio element */}
    </div>
  )
}

export default Popups
