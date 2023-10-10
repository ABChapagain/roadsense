'use client'
import React from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { isNull } from 'lodash'
import Image from 'next/image'
var relativeTime = require('dayjs/plugin/relativeTime')

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
          <Image
            src={`/../${accident.photos}`}
            alt={accident.photos}
            width={200}
            height={200}
            className='w-40 h-40 object-cover'
          />
        </td>

        <td className='px-6 py-4'>
          {dayjs(accident.createdAt).format('DD, MMMM YYYY')}
        </td>
        <td className='px-6 py-4'>
          {dayjs(accident.createdAt).format('hh:mm A')}
        </td>

        <td className='px-6 py-4'>{accident.cctv?.city}</td>
        <td className='px-6 py-4'>
          <span
            className={`${
              accident.accidentClassification === 'Fatal'
                ? 'bg-red-500 text-white'
                : accident.accidentClassification === 'Serious'
                ? 'bg-yellow-500 text-white'
                : accident.accidentClassification === 'Normal'
                ? 'bg-blue-500 text-white'
                : ''
            }  px-5 py-2 rounded-full`}
          >
            {accident.accidentClassification || 'N/A'}
          </span>
        </td>
        <td className='px-6 py-4'>
          <Link
            href={`accidents/${accident._id}`}
            className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
          >
            Details
          </Link>
        </td>
      </tr>
    </>
  )
}

export default AccidentList
