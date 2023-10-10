'use client'
import { createCctv } from '@/helpers/cctvHelper'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AddCctvForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    ipAddress: '',
    latitude: '',
    longitude: '',
    city: '',
    status: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.ipAddress ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.city
    ) {
      return setError('Please fill all the fields')
    }
    setLoading(true)
    try {
      await createCctv(formData)
      toast.success('Successfully added CCTV')
    } catch (error) {
      setError('Failed to add CCTV')
    }
    setLoading(false)
    router.refresh()
    setFormData({
      ipAddress: '',
      latitude: '',
      longitude: '',
      city: '',
      status: false,
    })
  }

  return (
    <form className='mb-16' onSubmit={handleSubmit}>
      <div className='mb-4 grid grid-cols-2 gap-5'>
        <input
          className='border px-5 py-3 rounded-full outline-none w-full col-span-2'
          id='ipAddress'
          type='text'
          value={formData.ipAddress}
          onChange={handleChange}
          placeholder='Enter IP Address'
        />

        <input
          className='border px-5 py-3 rounded-full outline-none w-full'
          id='latitude'
          type='number'
          value={formData.latitude}
          onChange={handleChange}
          placeholder='Enter Latitude'
        />
        <input
          className='border px-5 py-3 rounded-full outline-none w-full'
          id='longitude'
          type='number'
          onChange={handleChange}
          value={formData.longitude}
          placeholder='Enter Longitude'
        />

        <input
          className='border px-5 py-3 rounded-full outline-none w-full col-span-2'
          id='city'
          type='text'
          onChange={handleChange}
          value={formData.city}
          placeholder='Enter City'
        />

        <label className='relative inline-flex items-center mr-5 cursor-pointer col-span-2'>
          <input
            type='checkbox'
            value=''
            className='sr-only peer'
            checked={formData.status}
            onChange={() => {
              setFormData({
                ...formData,
                status: !formData.status,
              })
            }}
          />
          <div className="w-11 h-[1.52rem] bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>

        {error && <p className='text-red-500 mt-5'>{error}</p>}

        <button
          className='border px-5 py-3 rounded-full outline-none w-full col-span-2 uppercase font-semibold tracking-wide text-white bg-green-600 hover:bg-green-700'
          type='submit'
        >
          {loading ? 'Loading...' : 'Add CCTV'}
        </button>
      </div>
    </form>
  )
}

export default AddCctvForm
