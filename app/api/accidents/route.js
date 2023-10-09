import connectDB from "@/utils/connectDB";
import Accidents from "@/models/AccidentModel";
import "@/models/CctvModel";
import { NextResponse } from "next/server";
import { io } from "socket.io-client";

//  @route  GET api/accidents
//  @desc   Get all accidents
//  @access Public
export async function GET() {
   try {
      await connectDB();
      const response = await Accidents.find({}).populate("cctv");
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

      //initializing socket.io
      const socket = io("http://localhost:4000");
      socket.emit("send-message", data);

      return NextResponse.json(data, { status: 201 });
   } catch (e) {
      console.log(e.message);
   }
}
