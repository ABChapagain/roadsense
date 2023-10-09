import connectDB from "@/utils/connectDB";
import Cctv from "@/models/CctvModel";
import { NextResponse } from "next/server";

// @route  GET api/cctvs/:id
// @desc   Get single  cctv by id
// @access Public

export async function GET(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      const response = await Cctv.findById(id);
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
