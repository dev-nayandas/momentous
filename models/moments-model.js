import mongoose, {Schema} from "mongoose";

const schema = new Schema({
  name: {
    required: true,
    type: String
  },
  details: {
    required: true,
    type: String
  },
  location: {
    required: true,
    type: String
  },
  imageUrl: {
    required: true,
    type: String
  },
  interested_ids: {
    required: false,
    type: Array
  },
  going_ids: {
    required: false,
    type: Array
  },
  swgs: {
    required: false,
    type: Array
  }
});


export const momentsModel = mongoose.models.moments ?? mongoose.model("moments", schema);