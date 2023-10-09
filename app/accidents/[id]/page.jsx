'use client'
import React, { useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { BiTime } from 'react-icons/bi'
import Image from 'next/image'

const AccidentDetailsPage = () => {
  const [severity, setSeverity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const options = [
    { id: 1, label: 'Fatal', checked: false, color: 'bg-red-500' },
    { id: 2, label: 'Serious', checked: false, color: 'bg-yellow-500' },
    { id: 3, label: 'Normal', checked: false, color: 'bg-blue-500' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!severity) {
      return setError('Please select severity')
    }
    setLoading(true)
    try {
      await fetch('/api/accidents/id', {
        method: 'PUT',
        body: JSON.stringify({ severity }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      setError('Failed to update severity')
    }
    setLoading(false)
    alert(severity)
  }

  return (
    <div>
      <div className='flex gap-5 items-start'>
        <img
          src='https://picsum.photos/700'
          blurDataURL='https://picsum.photos/700'
          placeholder='blur'
          alt='accident image'
          width={700}
          height={700}
          className='h-[700px] w-[1100px] object-cover'
        />

        <div className='flex flex-col gap-5'>
          <div className='bg-red-500 text-white px-5 py-3 rounded-full tracking-wide flex items-center gap-3'>
            <FiMapPin className='inline-block w-5 h-5' />
            <h1>Pulchowk, Kathmandu</h1>
          </div>
          <div className='bg-green-500 text-white px-5 py-3 rounded-full tracking-wide flex items-center gap-3'>
            <BiTime className='inline-block h-5 w-5' />
            <h1>2021-09-23 10:31 PM </h1>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='mt-10'>
        <h1 className='font-semibold text-3xl mb-5'>Severity</h1>
        <div className='flex gap-5'>
          {options?.map((option) => (
            <div
              key={option.id}
              className={`${option.label === severity
                  ? `${option.color} text-white`
                  : 'bg-gray-200'
                } px-5 py-3 rounded tracking-wide flex items-center gap-3 cursor-default`}
              onClick={() => setSeverity(option.label)}
            >
              <h1>{option.label}</h1>
            </div>
          ))}
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
        {/* Make a submit button */}
        <button
          type='submit'
          className='px-5 py-3 bg-green-500 text-white rounded-full mt-5'
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default AccidentDetailsPage