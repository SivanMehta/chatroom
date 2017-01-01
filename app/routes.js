const path = require('path')
const profile = require('./models/profile')

exports.init = (app, done) => {

  function login(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'login.html'))
  }

  function authorizeBrowser(req, res) {
    app.logger.debug(req.body)

    // do some checking

    res.cookie('email', req.body.email)
    res.redirect("/")
  }

  function is_logged_in(req, res, next) {
    const status = req.cookies.email ? true : false
    status ? next() : res.redirect("/login")
  }

  function logout(req, res) {
    ['email', 'io'].forEach(cookie => res.clearCookie(cookie))
    res.redirect("/login")
  }

  // auth routes
  app.get("/login", login)
  app.post("/login", authorizeBrowser)
  app.get("/logout", logout)

  // api-driven routes
  // app.get('/api/authorize', authorizeAPI)
  app.get("/api/profiles", is_logged_in, profile.getProfile)
  app.get("/api/settings", is_logged_in, profile.getSettings)
  app.get('/api/messages/:roomID', is_logged_in, app.db.getRoomMessages)
  app.post("/api/messages", is_logged_in, app.db.receiveMessage)
  app.get("/api/search", is_logged_in, app.db.searchMessages)

  // serve react application
  app.get("/", is_logged_in, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
  })

  app.logger.info("Initialized routes")
  done()
}
