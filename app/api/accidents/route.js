import connectDB from "@/utils/database";
import Accidents from "@/models/Accident";
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
      const response = await Accidents.create(request.body);
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
