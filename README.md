# Technologies that I want to use in this project

Just using as many different Node.js libraries / techniques as possible so I have a centralized place to reference code.

- [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/docs/basics/UsageWithReact.html) for general front-end control flow
  - Could be built with some combination of [Webpack](https://webpack.github.io/) / [Gulp](http://gulpjs.com/)
  - Be sure to [minimize it](https://github.com/Swaagie/minimize)
- [D3.js](https://d3js.org/) for graphs and visualizations of gathered data
- Abstracted back end
  - use [Level](https://github.com/Level/levelup) in development
  - use [Mongo](https://www.mongodb.com/) in "production" because it actually scales beyond one computer
- API driven backend interaction so a native iOS / Android would simply be easy to develop
  - you could use [understudy](https://github.com/bmeck/understudy) to extensibly layout the API like with Slay
- Backend API calls made via [fetch](https://github.com/github/fetch)
- [Travis-CI](https://travis-ci.org/) automatic testing suite
- Logging via [Winston](https://github.com/winstonjs/winston)
- Pick a dataset that allows us to use some form of Machine Learning in order to use [Synaptic](http://caza.la/synaptic/#)
- Try and distribute something via multiple threads via Node's built-in [cluster](https://nodejs.org/api/cluster.html) api

# Ideas for App itself

- This could be an implementation of a chat app like Slack that imploys the usage of each of the above systems in a valuable part of the system
- Feature - Technology Map
  - React/Redux --> General interface (just build with mobile-friendly bootstrap for ease of use)
  - Webpack / Gulp --> Build tools
  - D3.js --> Analytics on chat statistics
  - Cluster --> Compiling chat data and aggregating properly
  - Level / Mongo --> Persistence of chat messages
  - github/fetch --> fetching past messages when returning to channel
  - Synaptic --> Suggesting messages (can use markov chains perhaps)
