const faker = require('faker')

// ideally this would be pulled form the database,
// but for now we can just generate on the fly
function getProfile(req, res) {
  const profile = {
    email: req.cookies.email,
    avatar: faker.internet.avatar(),
    company: faker.company.companyName(),
    motto: faker.hacker.phrase(),
    mantra: faker.lorem.paragraph(),
    background: faker.image.city()
  }

  res.send(profile)
}

module.exports = {
  getProfile
}
