'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { BiTime } from 'react-icons/bi'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import GoogleMapComponent from '@/app/components/GoogleMapComponent'
import toast, { LoaderIcon } from 'react-hot-toast'

const AccidentDetailsPage = ({ params: { id } }) => {
  const router = useRouter()
  const [severity, setSeverity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [data, setData] = useState({})
  const [markers, setMarkers] = useState({})

  useEffect(() => {
    getAccident()
  }, [])

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
      await fetch('/api/accidents/' + id, {
        method: 'PUT',
        body: JSON.stringify({ accidentClassification: severity }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      setError('Failed to update severity')
    }
    setLoading(false)
    toast.success('Successfully updated severity')
    router.push('/accidents')
    router.refresh()
  }

  const getAccident = async () => {
    try {
      const res = await fetch('/api/accidents/' + id)
      const data = await res.json()
      setData(data)
      setSeverity(data.accidentClassification)
      setMarkers({
        city: data.cctv.city,
        lat: data.cctv.location.latitude,
        lng: data.cctv.location.longitude,
        position: {
          lat: data.cctv.location.latitude,
          lng: data.cctv.location.longitude,
        },
        ip: data.cctv.ipAddress,
        type: 'accident',
      })
    } catch (error) {
      setError('Failed to fetch accident')
    }
    setDataLoading(false)
  }

  const center = () => {
    const totalCount = 1
    let latSum = 0
    let lngSum = 0

    latSum += data.cctv.location.latitude
    lngSum += data.cctv.location.longitude

    const lat = latSum / totalCount
    const lng = lngSum / totalCount

    return { lat, lng }
  }

  // if (dataLoading) return <div>Loading...</div>

  if (dataLoading)
    return (
      <div className='flex w-full h-full items-center justify-center'>
        <div
          class='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
          role='status'
        >
          <span class='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
            Loading...
          </span>
        </div>
      </div>
    )

  return (
    <div>
      <div className='flex flex-col gap-5 items-start'>
        <Image
          src={`/../${data?.photos}`}
          alt={data?.photos}
          width={700}
          height={700}
          className='h-[700px] w-[1100px] object-cover'
        />

        <div className='flex flex-col w-full gap-3'>
          <div className='flex flex-row gap-5'>
            <div className='bg-red-500 text-white px-5 py-3 rounded-full tracking-wide flex items-center gap-3'>
              <FiMapPin className='inline-block w-5 h-5' />
              <h1>{data?.cctv?.city}</h1>
            </div>
            <div className='bg-green-500 text-white px-5 py-3 rounded-full tracking-wide flex items-center gap-3'>
              <BiTime className='inline-block h-5 w-5' />
              <h1>
                {dayjs(data?.createdAt).format('DD, MMMM YYYY, hh:mm A')}{' '}
              </h1>
            </div>
          </div>
          {/* Map */}
          {data && (
            <Suspense fallback={<div>Loading...</div>}>
              <GoogleMapComponent
                height='500px'
                width='100%'
                markers={[markers]}
                zoom={15}
                center={center()}
              />
            </Suspense>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className='mt-10'>
        <h1 className='font-semibold text-3xl mb-5'>Severity</h1>
        <div className='flex gap-5'>
          {options?.map((option) => (
            <div
              key={option.id}
              className={`${
                option.label === severity
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
