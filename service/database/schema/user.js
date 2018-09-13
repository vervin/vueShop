// 定义一个用户Schema

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  UserId: Schema.Types.ObjectId,
  userName: {
    unique: true,
    type: String
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
},{
  collection: 'user'
})




userSchema.pre('save', function (next) {
  //let user = this
  console.log(this)
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePasswords(_password, password){
        return new Promise((resolve, reject)=>{
          bcrypt.compare(_password, password, (err, isMatch)=>{
            if(!err) resolve(isMatch)
            else reject(err)
          })
        })
  }
}

mongoose.model('User', userSchema)
