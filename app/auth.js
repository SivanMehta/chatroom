const path = require('path')
// const scrambler = require('./scrambler')
const rooms = require('./rooms')
const words = require('random-words');
// const cookieName = words({ exactly: 5, join: '-' })

function login(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'login.html'))
}

function authorize(req, res) {
  console.log(req.body)

  // do some checking

  res.cookie('email', req.body.email)
  res.redirect("/")
}

function is_logged_in(req, res, next) {
  const status = req.cookies.email ? true : false
  status ? next() : res.redirect("/login")
}

function logout(req, res) {
  res.clearCookie('email')
  res.redirect("/login")
}

exports.init = (app) => {

  // auth routes
  app.get("/login", login)
  app.post("/login", authorize)
  app.get("/logout", logout)

  // rooms
  app.get("/api/rooms/:roomId", is_logged_in, rooms.getRoomMessages)

  // main application
  app.get("/", is_logged_in, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
  })
}
