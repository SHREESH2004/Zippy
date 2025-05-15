import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3, // Optional: Ensure username is at least 3 characters long
    maxlength: 50, // Optional: You can set a maximum length
    unique: true, // Optional: Ensure the username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Optional: Email regex validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Optional: Minimum length for password
  },
  role:{
    type: String,
    default:'user'
  }
});

const User = mongoose.model("User", userSchema);

export default User;
