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

// @route PUT api/cctvs/:id
// @desc Update cctvs
// @access Public
export async function PUT(request, { params }) {
   try {
      await connectDB();

      const { id } = params;
      const req = await request.json();

      // Find the cctvs object by ID and update it
      const updatedcctvs = await Cctv.findByIdAndUpdate(id, req, { new: true });

      return NextResponse.json(updatedcctvs, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}

// @route  DELETE api/cctvs/:id
// @desc   Delete cctv by id
// @access Public
export async function DELETE(request, { params }) {
   try {
      await connectDB();
      const { id } = params;
      await Cctv.findByIdAndDelete(id);
      const response = "Deleted successfully";
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e.message);
   }
}
