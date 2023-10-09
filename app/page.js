import { getAllCctv } from '@/helpers/cctvHelper'
import Image from 'next/image'
import AddCctvForm from './components/AddCctvForm'

export default async function Home() {
  const cctvLists = await getAllCctv()
  const analyticsData = [
    {
      id: 1,
      name: 'Cities covered',
      number: cctvLists?.length || 0,
      color: 'text-yellow-500',
    },
    {
      id: 3,
      name: 'Total Cctvs',
      number: '8',
      color: 'text-blue-500',
    },
    {
      id: 4,
      name: 'Total Accidents',
      number: '104',
      color: 'text-red-500',
    },
  ]

  return (
    <section className='flex'>
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
      </div>
      <div>{/* Integrate map here */}</div>
    </section>
  )
}
