const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const Router = require('koa-router')
let user = require('./appApi/User.js')
let goods = require('./appApi/goods.js')

const bodyParser = require('koa-bodyparser')
app.use(bodyParser());

const cors = require('koa2-cors')
app.use(cors())



let router = new Router()
router.use('/user', user.routes())
router.use('/goods',goods.routes())


app.use(router.routes())
app.use(router.allowedMethods())


const {
  connect,
  initSchemas
} = require('./database/init.js')

;(async () => {
  await connect()
  await initSchemas()
  const User = mongoose.model('User')
  // console.log(User)
  // let oneUser = new User({
  //   userName: 'vervin8',
  //   password: '123456'
  // })
  // oneUser.save().then(() => {
  //   console.log('插入成功')
  // })

  let users = await User.findOne({}).exec()
  console.log('------------------')
  console.log(users)
  console.log('------------------')
})()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
