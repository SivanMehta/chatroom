const path = require('path')

function login(req, res) {
  res.cookie('is-logged-in', true)
  res.redirect("/")
}

function logout(req, res) {
  res.clearCookie('is-logged-in')
  res.redirect("/")
}

exports.init = (app) => {

  // auth routes
  app.get("/login", login)
  app.get("/logout", logout)

  // main application
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
  })
}
