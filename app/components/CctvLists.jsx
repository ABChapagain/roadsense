'use client'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

const handleDelete = async (id) => {
    //   const res = await fetch(/api/cctv/${id}, {
    //     method: 'DELETE',
    //   })

    //   if (res.status === 200) {
    //     window.location.reload()
    //   }

    alert(`Delete ${id}`)
}

const CctvLists = ({ cctvLists }) => {
    return (
        <div className='mb-16'>
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