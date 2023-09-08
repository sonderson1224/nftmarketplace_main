import mongoose, { Schema } from "mongoose";

const LikesSchema = new mongoose.Schema({
  tokenId: {
    unique: true,
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

const Likes = mongoose.models.Likes || mongoose.model("Likes", LikesSchema);
export default Likes;
