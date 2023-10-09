import connectDB from "@/utils/connectDB";
import Accidents from "@/models/AccidentModel";
import "@/models/CctvModel";
import { NextResponse } from "next/server";

// @route  GET api/accidents/:id
// @desc   Get all accidents
// @access Public

export async function GET(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const response = await Accidents.findById(id).populate("cctv");
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
