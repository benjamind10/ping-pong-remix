import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the user's password before saving.
userSchema.pre('save', function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Auto-generate a salt and hash
  bcrypt.hash(
    this.password,
    10,
    (err: mongoose.CallbackError | undefined, hash: string) => {
      if (err) return next(err);
      // Override the plaintext password with the hashed one
      this.password = hash;
      next();
    }
  );
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
