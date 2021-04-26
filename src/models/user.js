import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    toJSON: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(this.password, salt);
      this.password = hashed;
    }

    next();
  } catch (e) {
    next(error);
  }
});

UserSchema.methods.isValidPass = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

const User = mongoose.model("user", UserSchema);

export default User;
