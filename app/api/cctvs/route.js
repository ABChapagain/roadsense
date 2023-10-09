import connectDB from '@/utils/connectDB'
import Cctvs from '@/models/CctvModel'
import { NextResponse } from 'next/server'

//  @route  GET api/cctvs
//  @desc   Get all cctvs
//  @access Public
export async function GET() {
  try {
    await connectDB()
    const response = await Cctvs.find({})
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.log(e)
  }
}

//  @route  POST api/cctvs
//  @desc   Create a post request on cctv
//  @access Public
export async function POST(request) {
   try {
      await connectDB();
      const req = await request.json();
      console.log(req);
      const data = await Cctvs.create(req);
      return NextResponse.json(data, { status: 201 });
   } catch (e) {
      console.log(e.message);
   }
}
