import connectDB from "@/utils/database";
import Cart from "@/models/Cart";
import Accidents from "@/models/Accident";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
   try {
      await connectDB();
      const { slug } = params;
      const response = await Cart.findById(slug).populate("user items");
      return NextResponse.json(response, { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
