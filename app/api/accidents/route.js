import connectDB from '@/utils/connectDB'
import Accidents from '@/models/AccidentModel'
import '@/models/CctvModel'
import { NextResponse } from 'next/server'
import { io } from 'socket.io-client'
import Cctv from '@/models/CctvModel'

//  @route  GET api/accidents
//  @desc   Get all accidents
//  @access Public
export async function GET() {
  try {
    await connectDB()
    const response = await Accidents.find({})
      .populate('cctv')
      .sort({ createdAt: -1 })
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.log(e)
  }
}

//  @route  POST api/accidents
//  @desc   Create a post request on accident report
//  @access Public
export async function POST(request) {
  try {
    await connectDB()
    const { photos, cctv } = await request.json()

    const ccCamera = await Cctv.findById(cctv)

    if (!ccCamera) {
      return NextResponse.json({ error: 'CCTV not found' }, { status: 404 })
    }

    const accident = new Accidents({
      photos,
      cctv: ccCamera,
    })

    const createdAccident = await accident.save()

    //initializing socket.io
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)
    socket.emit('send-message', createdAccident)

    return NextResponse.json(createdAccident, { status: 201 })
  } catch (e) {
    console.log(e.message)
  }
}
