import mongoose from "mongoose";

// Utils
import PointSchema from "./utils/PointSchema";

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    createIndex: "2dsphere"
  },
  user: {
    name: String,
    email: String,
    password: String
  },
  followers: [Object],
  following: [Object]
});

export default mongoose.model("Dev", DevSchema);
