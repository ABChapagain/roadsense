'use client'
import { set } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

function Popups() {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)

  const [show, setShow] = useState(true)

  //   const [show, setShow] = useState(true)

  //   useEffect(() => {
  //     function wran() {
  //       let audio = document.getElementById('warn-audio')

  //       try {
  //         audio.play()
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }

  //     socket.on('receive-message', (message) => {
  //       console.log(message)

  //       if (message) {
  //         setShow(true)
  //         setTimeout(() => wran(), 100)
  //       }

  //       //   here
  //     })
  //   }, [])

  setTimeout(() => {
    warn()
  }, 100)

  const warn = () => {
    let audoo = document.getElementById('autoo')
    try {
      audoo.play()
    } catch (err) {
      console.log(err)
    }
  }

  //   const cancelAlert = () => {
  //     setShow(false)
  //   }

  //   if (!show) return null

  return (
    <div
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
                Koteshwor, Kathmandu
              </span>
            </h2>
            <p className='text-sm text-gray-500 px-8'>
              Please click on view details to view the details of the accident.
            </p>
          </div>
          {/*footer*/}
          <div className='p-3 mt-2 text-center space-x-4 md:block'>
            <button
              onClick={() => setShow(false)}
              className='mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600'
            >
              Cancel
            </button>
            <button
              onClick={() => {}}
              className='mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100'
            >
              View Details
            </button>
          </div>
        </div>

        {show && (
          <audio controls id='warn-audio' autoplay>
            <source src='./res/warning.mp3' type='audio/ogg' />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      {/* audio element */}
    </div>
  )
}

export default Popups
