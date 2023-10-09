import connectDB from "@/utils/connectDB";
import Accidents from "@/models/AccidentModel";
import { NextResponse } from "next/server";

//  @route  GET api/accidents
//  @desc   Get all accidents
//  @access Public
export async function GET() {
   try {
      await connectDB();
      const response = await Accidents.find({});
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

//  @route  POST api/accidents
//  @desc   Create a post request on accident report
//  @access Public
export async function POST(request) {
   try {
      await connectDB();
      const req = await request.json();
      const data = await Accidents.create(req);
      return NextResponse.json({ success: true }, { status: 201 });
   } catch (e) {
      console.log(e.message);
   }
}
