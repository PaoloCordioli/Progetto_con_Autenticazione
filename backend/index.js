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

app.get('/Messages', function (req, res) {
  res.send(db.get('messages'))
});

app.get('/test', (req, res) => {
  validateToken(req, res)
  res.send({
    status: 'authorized'
  })
})

app.post('/users/:username', async (req, res) => {
  const password = req.body.password
  const username = req.params.username

  const user = db.get('users').find({ username }).value()

  const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: 86400 })

  const authenticated = await bcrypt.compare(password, user.hashedPassword)

  res.send({
    authenticated,
    token
  })
});

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

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});