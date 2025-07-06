import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

adminSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

adminSchema.methods.isPasswordCorrect = async function(password) {
  return bcrypt.compare(password, this.password)
}

adminSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email
    },
    process.env.JSON_WEB_TOKEN_SECRET,
    { expiresIn: "2h" }
  )
}

export const Admin = mongoose.model('Admin', adminSchema)
