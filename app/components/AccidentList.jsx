'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const AccidentList = ({ accident, index }) => {
  return (
    <>
      <tr key={accident._id} className='bg-white border-b hover:bg-gray-50'>
        <th
          scope='row'
          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
        >
          {index + 1}
        </th>
        <td className='px-6 py-4'>
          {dayjs(accident.createdAt).format('DD/MM/YYYY')}
        </td>
        <td className='px-6 py-4'>
          {dayjs(accident.createdAt).format('HH:mm:ss')}
        </td>
        <td className='px-6 py-4'>{accident.cctv}</td>
        <td className='px-6 py-4'>{accident.severity}</td>
        <td className='px-6 py-4'>{accident.photos}</td>
        <td className='px-6 py-4 text-right'>
          <a
            href='#'
            className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
          >
            Details
          </a>
        </td>
      </tr>
    </>
  )
}

export default AccidentList
