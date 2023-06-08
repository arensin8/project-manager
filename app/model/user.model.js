const { default: mongoose, Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_Image: { type: String , required: false },
    roles: { type: [String], default: ["USER"] },
    mobile: { type: String, required: true, unique: true },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    skills: { type: [String], default: [] },
    token: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);
module.exports = {
  userModel,
};
