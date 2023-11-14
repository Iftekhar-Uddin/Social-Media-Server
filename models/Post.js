import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId:{
      type: String,
      required: true
    },
    desc:{
      type: String,
      max: 1000,
      min: 3
    },
    img:{
      type: String,
    },
    likes:{
      type: [String],
      default:[]
    },
  },
  {timestamps: true},
);

export default mongoose.model("Post", PostSchema);