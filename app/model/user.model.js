const { default: mongoose, Schema, model } = require("mongoose");
const inviteRequest = new mongoose.Schema({
  teamId: { type: mongoose.Types.ObjectId, required: true },
  caller: { type: String, required: true, lowercase: true },
  status: { type: String, required: true, default: "pending" },
  requestDate: { type: Date, default: new Date() },
});
const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profile_Image: { type: String, required: false },
    roles: { type: [String], default: ["USER"] },
    mobile: { type: String, required: true, unique: true },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    skills: { type: [String], default: [] },
    token: { type: String, default: "" },
    inviteRequests : {type: [inviteRequest]}
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);
module.exports = {
  userModel,
};
