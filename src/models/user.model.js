const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");
const { roles } = require("../config/roles");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// In Department we also join using Object Id
/**
 * department: {
      type: mongoose.Types.ObjectId, ref: "Department"
    },
 */

userSchema.pre("save", async function (next) {
  console.log("JJJJJJJJJJJ", this);
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  console.log("email", email, ":::::::", excludeUserId);
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  console.log(user, "::::::", !!user);
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  let a = await bcrypt.compare(password, user.password);
  return bcrypt.compare(password, user.password);
};

/**
 * @typedef User
 */

userSchema.plugin(mongoosePaginate);

// mongoose-aggrigate-version-2
const User = mongoose.model("User", userSchema);
module.exports = User;
