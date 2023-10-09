import {Schema, model,models} from 'mongoose';

const AccidentSchema = new Schema({
   accidentDate: {
      type: Date,
      required: true,
      default: Date.now(),
   },

   accidentTime: {
      type: String,
      required: true,
      default: Date.now(),
   },

   accidentLocation: {
      type: String,
      required: true,
   },

   accidentClassification: {
      type: String,
      required: true,
      enum: ["Fatal", "Serious", "Normal"],
   },

   photos: {
      type: String,
      required: true,
   },
   
   cctv: {
      type: Schema.Types.ObjectId,
      ref: "cctvs",
   },
});

const Accident = models.Accident || model("Accident", accidentSchema);
export default Accident;