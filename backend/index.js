require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: [] })
  .write()

const validateToken = (req, res) => {
  const token = req.headers['x-access-token']
  if (!token) {
    res.send({
      ok: false,
      data: {
        err: "unauthorized"
      }
    })
    return
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.send({
        ok: false,
        data: {
          err: "unauthorized"
        }
      })
      return
    }
  })
}

app.get('/messages', function (req, res) {
  res.send(db.get('messages'))
});

app.post('/messages', function (req, res) {
  let newMsg = req.body
  db.get('messages').push(newMsg).write()
  res.send('POST request')
});

app.get('/message', (req, res) => {
  validateToken(req, res)
  res.send({
    ok: true,
    data: {
      err: ''
    }
  })
})

app.post('/users/:username', async (req, res) => {
  const password = req.body.password
  const username = req.params.username

  const user = db.get("users").find({ username }).value()

  if (user) {
    const authenticated = await bcrypt.compare(password, user.hashedPassword)

    if (authenticated) {
      const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: 86400 })
      res.send({
        ok: true,
        data: {
          token,
          err: ''
        }
      })
    }
    else {
      res.send({
        ok: false,
        data: {
          token: '',
          err: 'error with password'
        }
      })
    }
  }

  else res.send({
    ok: false,
    data: {
      token: '',
      err: 'error with username'
    }
  })

})

app.post('/users', async (req, res) => {
  const { username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 8)

  if (db.get('users').find({ username: username }).size().value() > 0) {
    res.send({
      ok: false,
      data: {
        err: "user alredy exists"
      }
    })
    return
  }

  const newUser = {
    username,
    hashedPassword
  }

  db.get('users').push(newUser).write()

  res.send(newUser)
});

app.get('/login', (req, res) => {
  res.send(db.get('login'))
})

app.post('/login', async (req, res) => {
  const { login, token, username } = req.body

  if(login){
    find = "false"
    newLogin = "true"
    newToken = token
    newUsername = username
  }else {
    find = "true"
    newLogin = "false"
    newToken = ""
    newUsername = ""
  }

  db.get('login')
  .find({login : find})
  .assign({ login: newLogin, token: newToken, username : newUsername})
  .write()

  res.send('ok')
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});