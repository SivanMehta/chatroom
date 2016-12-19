const faker = require('faker')

// ideally these would be pulled form the database,
// but for now we can just generate on the fly
//
function getProfile(req, res) {
  const profile = {
    email: req.cookies.email,
    avatar: faker.internet.avatar(),
    company: faker.company.companyName(),
    motto: faker.company.catchPhrase(),
    mantra: faker.lorem.paragraphs(),
    background: faker.image.city()
  }

  res.send(profile)
}

function getSettings(req, res) {
  const settings = {
    autocomplete: true,
    language: 'English',
    email: req.cookies.email,
    status: true
  }

  res.send(settings)
}

module.exports = {
  getProfile,
  getSettings
}
