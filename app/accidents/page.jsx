import { getAllAccidents } from '@/helpers/accidentHelper'
import React from 'react'
import dayjs from 'dayjs'
import AccidentList from '../components/AccidentList'

const AccidentPage = async () => {
  // fetching all accidents
  const accidents = await getAllAccidents()

  return (
    <div>
      <h2 className='font-semibold text-3xl mb-10'>Accidents</h2>
      <div className='relative w-full overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                S.N
              </th>
              <th scope='col' className='px-6 py-3'>
                Image
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Time
              </th>
              <th scope='col' className='px-6 py-3'>
                Location
              </th>
              <th scope='col' className='px-6 py-3'>
                Severity
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {accidents?.map((accident, index) => (
              <AccidentList
                key={accident._id}
                accident={accident}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccidentPage
