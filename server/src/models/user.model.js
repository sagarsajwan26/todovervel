import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  tasks:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Task',
      default:[]
    }
  ]
}, { timestamps: true })

userSchema.pre('save',async function(next){
try {
    if(!this.isModified('password')) return next()
  this.password=  await bcrypt.hash(this.password,10)
  
return next()
} catch (error) {
  return next(error)
}
})

userSchema.methods.isPasswordCorrect=async function(password){
  if(!password) return
  return bcrypt.compare(password,this.password) 


}

userSchema.methods.generateAccessToken = async function(){
  return jwt.sign({
    id:this._id,
    username:this.username,
    email:this.email
  },process.env.JSON_WEB_TOKEN_SECRET,{expiresIn:'2h'})
}

export const User = mongoose.model('User', userSchema)
