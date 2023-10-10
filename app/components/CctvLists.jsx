'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'

const CctvLists = ({ cctvLists }) => {
  const router = useRouter()

  const handleDelete = async (id) => {
    await fetch(`/api/cctvs/${id}`, {
      method: 'DELETE',
    })
    router.refresh()
    toast.success('CCTV deleted successfully')
  }
  return (
    <div>
      <h1 className='mb-3 text-2xl font-semibold'>Areas covered by CCTVs</h1>
      <div className='flex gap-3 flex-col'>
        {cctvLists.map(({ _id, city, ipAddress }) => (
          <div
            key={_id}
            className='border px-5 py-4 rounded-full shadow-sm flex justify-between items-center'
          >
            <h2 className='text-black/80 tracking-wide'>
              {city} (
              <a href={ipAddress} target='_blank' className='text-blue-400'>
                {ipAddress}
              </a>
              )
            </h2>
            <button onClick={() => handleDelete(_id)}>
              <AiOutlineDelete className='h-5 w-5 cursor-pointer hover:text-red-500' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CctvLists
