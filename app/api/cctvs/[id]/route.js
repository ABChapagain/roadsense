import connectDB from '@/utils/connectDB'
import Cctv from '@/models/CctvModel'
import { NextResponse } from 'next/server'

// @route  GET api/cctvs/:id
// @desc   Get single  cctv by id
// @access Public

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    const response = await Cctv.findById(id)
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.log(e)
  }
}

// @route  PUT api/cctvs/:id
// @desc   Update cctv by id
// @access Public

export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    const { ipAddress, location, status, city } = request.body

    const cctv = await Cctv.findById(id)

    if (cctv) {
      cctv.ipAddress = ipAddress || cctv.ipAddress
      cctv.location = location || cctv.location
      cctv.status = status || cctv.status
      cctv.city = city || cctv.city

      await cctv.save()
      return NextResponse.json(cctv, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Cctv not found' }, { status: 404 })
    }
  } catch (error) {
    console.log(e)
  }
}

// @route  DELETE api/cctvs/:id
// @desc   Delete cctv by id
// @access Public
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    await Cctv.findByIdAndDelete(id)
    const response = 'Deleted successfully'
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.log(e.message)
  }
}
