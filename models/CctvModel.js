import { model, models, Schema } from "mongoose";

const cctvSchema = Schema(
   {
      ipAddress: {
         type: String,
         required: true,
      },

      location: {
         latitude: {
            type: Number,
            required: true,
         },
         longitude: {
            type: Number,
            required: true,
         },
      },

      status: {
         type: Boolean,
         default: true,
         required: true,
      },
      
      city: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Cctv = models.cctvs || model("cctvs", cctvSchema);
export default Cctv;
