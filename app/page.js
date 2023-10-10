import { getAllCctv } from '@/helpers/cctvHelper'
import Image from 'next/image'
import AddCctvForm from './components/AddCctvForm'
import CctvLists from './components/CctvLists'
import HomepageMap from './components/GoogleMapComponent'
import GoogleMapComponent from './components/GoogleMapComponent'
import { getAllAccidents } from '@/helpers/accidentHelper'
import { Suspense } from 'react'

export default async function Home() {
  const cctvLists = await getAllCctv()
  const accidents = await getAllAccidents()

  const analyticsData = [
    {
      id: 1,
      name: 'Cities covered',
      number: '1',
      color: 'text-yellow-500',
    },
    {
      id: 3,
      name: 'Total Cctvs',
      number: cctvLists?.length || 0,
      color: 'text-blue-500',
    },
    {
      id: 4,
      name: 'Total Accidents',
      number: accidents?.length || 0,
      color: 'text-red-500',
    },
  ]

  const markers = accidents?.map(({ city, cctv }) => ({
    city: cctv.city,
    lat: cctv.location.latitude,
    lng: cctv.location.longitude,
    position: {
      lat: cctv.location.latitude,
      lng: cctv.location.longitude,
    },
    ip: cctv.ipAddress,
    type: 'cctv',
  }))

  const center = () => {
    const totalCount = accidents.length
    let latSum = 0
    let lngSum = 0

    accidents.forEach((item) => {
      latSum += item.cctv.location.latitude
      lngSum += item.cctv.location.longitude
    })
    const lat = latSum / totalCount
    const lng = lngSum / totalCount

    return { lat, lng }
  }

  return (
    <section className='flex gap-10 flex-col 2xl:flex-row'>
      <div>
        <div className='mb-16'>
          <h1 className='mb-3 text-2xl font-semibold'>Analytics</h1>
          <div className='flex gap-5'>
            {analyticsData.map(({ id, name, number, color }) => (
              <div key={id} className='bg-slate-100 shadow rounded h-32 w-40'>
                <div className='flex items-center px-2 py-3 text-gray-500'>
                  <span className='text-sm'>{name}</span>
                </div>
                <div className={`pb-2 mt-3 ml-2 text-5xl w-14 ${color}`}>
                  {number}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AddCctvForm />

        {/* Cctv Lists */}
        <CctvLists cctvLists={cctvLists} />
      </div>
      <div className='2xl:h-auto h-[500px] w-full'>
        <Suspense fallback={<div>Loading...</div>}>
          <GoogleMapComponent
            markers={markers}
            center={center()}
            zoom={10}
            height='100%'
            width='100%'
          />
        </Suspense>
      </div>
    </section>
  )
}
