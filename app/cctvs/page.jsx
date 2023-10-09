import React from 'react'
import { getAllCctv } from '@/helpers/cctvHelper'

const CctvPage = async () => {
  const cctvs = await getAllCctv()
  return (
    <div>
      <div className='grid grid-cols-2 gap-5'>
        {cctvs.map((cctv) => (
          <img
            key={cctv._id}
            className='overflow-hidden w-full'
            src={cctv.ipAddress}
          />
        ))}
      </div>
    </div>
  )
}

export default CctvPage
