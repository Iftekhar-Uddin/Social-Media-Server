import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    phone: {
      type: String,
      max: 15,
      unique: true,
    },
    date_of_birth: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    country: {
      type: String,
      max: 50,
    },
    relationship: {
      type: String,
    },
    religion: {
      type: String,
    },
    home: {
      type: String,
    },
    post_code: {
      type: String,
    },
    village: {
      type: String,
    },
    secondary_study: {
      type: String,
    },
    higher_study: {
      type: String,
    },
    idol: {
      type: String,
    },
    job_institution: {
      type: String,
    },
    job_location: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  }
);

export default mongoose.model("User", UserSchema);