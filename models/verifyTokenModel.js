import bcrypt from "bcryptjs";
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const verifyTokenSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expiresIn: 3600,
    default: Date.now(),
  },
});

verifyTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = bcrypt.hashSync(this.token, 8);
  }
  next();
});

//method do not work with arrow function
verifyTokenSchema.methods.compareToken = async function (token) {
  return bcrypt.compareSync(token, this.token);
};

const VerifyTokenModel = mongoose.model("VerifyToken", verifyTokenSchema);
export default VerifyTokenModel;
