import { Schema, model, models } from 'mongoose'

const AccidentSchema = new Schema(
   {
      accidentClassification: {
         type: String,
         required: true,
         enum: ["Fatal", "Serious", "Normal"],
         default: "",
      },

      photos: {
         type: String,
         required: true,
      },

    cctv: {
      type: Schema.Types.ObjectId,
      ref: 'cctvs',
    },
  },

  {
    timestamps: true,
  }
)

const Accident = models.Accident || model('Accident', AccidentSchema)
export default Accident
