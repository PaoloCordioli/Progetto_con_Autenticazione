const express = require('express');
const async = require('express-async-await')
const fetch = require('node-fetch')
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ messages: [] })
    .write()

app.get('/messages', function (req, res) { // ritorna tutti i messaggi
    res.send(db.get("messages"))
});

app.post("/messages", async function (req, res) {
    const token = req.headers['x-access-token']

    let auth = await fetch("http://localhost:8000/authentication", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    }).then((res) => res.json())

    if (!auth.ok) {
        res.send({
            ok: false,
            data: {
                err: "unauthorized"
            }
        })
        return
    }

    let newMsg = req.body
    db.get('messages').push(newMsg).write()

    res.send({
        ok: true,
        data: {
            err: ''
        }
    })
});

app.listen(8080, () => {
    console.log('Example Message listening on port 8080!');
});