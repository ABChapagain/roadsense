import connectDB from '@/utils/connectDB'
import Accidents from '@/models/AccidentModel'
import '@/models/CctvModel'
import { NextResponse } from 'next/server'

// @route  GET api/accidents/:id
// @desc   Get all accidents
// @access Public

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    const response = await Accidents.findById(id).populate('cctv')
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.log(e)
  }
}

// @route  PUT api/accidents/:id
// @desc   Update accident
// @access Public
export async function PUT(request, { params }) {
  try {
    await connectDB()

    const { id } = params
    const req = await request.json()

    // Find the accident object by ID and update it
    const updatedAccident = await Accidents.findByIdAndUpdate(id, req, { new: true })

    return NextResponse.json(updatedAccident, { status: 200 })
  } catch (e) {
    console.log(e)
  }
}