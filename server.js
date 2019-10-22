require('dotenv').config();
const express = require('express')
const next = require('next')
const { parse } = require('url');
const session = require('express-session')
const request = require('request')
const qs = require('querystring')
const randomString = require('randomstring')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(
    session({
      secret: randomString.generate(),
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false
    })
  )

  server.get('/login', (req, res, next) => {
    req.session.csrf_string = randomString.generate();

    const githubAuthUrl =
      `https://github.com/login/oauth/authorize?${
        qs.stringify({
          client_id: process.env.CLIENT_ID,
          state: req.session.csrf_string,
          scope: 'user:email'
        })
      }`

    res.redirect(githubAuthUrl);
  });

  server.get('/redirect', (req, res) => {
    const code = req.query.code;
    const returnedState = req.query.state;
  
    if (req.session.csrf_string === returnedState) {
      request.post(
        {
          url:
          `https://github.com/login/oauth/access_token?${
            qs.stringify({
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              code: code,
              state: req.session.csrf_string
            })
          }`
        },
        (error, response, body) => {
          req.session.access_token = qs.parse(body).access_token;

          res.redirect('/search');
        }
      );
    } else {
      res.redirect('/');
    }
  });

  server.get('/search', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    let email
    request.get(
      {
        url: 'https://api.github.com/user/public_emails',
        headers: {
          Authorization: `token ${req.session.access_token}`,
          'User-Agent': 'Login-App'
        }
      },
      (error, response, body) => {
        email = qs.parse(body)
      }
    );
    return app.render(req, res, '/search', { ...query, email })
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})