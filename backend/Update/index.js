const CronJob = require('cron').CronJob
const moment = require('moment-timezone')
const fetch = require("node-fetch")


const get_data = async () => {
    const data = await fetch('https://message.paolocordioli.repl.co/messages').then(r => r.json())
    return data
}


const push_data = (messages) => {
    fetch("https://message.paolocordioli.repl.co/all_messages", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages })
    }).then((res) => res.json())
}

const job = new CronJob('*/1 * * * *', async () => {

    let messages = []

    const today = moment().format('HH:mm')
    const minutes_today = parseInt(today.substr(0, 2)) * 60 + parseInt(today.substr(3, 4))

    const data = await get_data()

    data.forEach(message => {

        const date = moment(message.date, "DD-MM-YYYY HH:mm").format("HH:mm")
        const minutes_date = parseInt(date.substr(0, 2)) * 60 + parseInt(date.substr(3, 4))

        const difference = minutes_today - minutes_date

        if (difference < 0) {
            messages.push(message)
        }

        console.log("Today : ", today, "    Date : ", date, "    difference : ", minutes_today - minutes_date)
    });

    console.log("Messages : ", messages)

    if (messages.length > 0) {
        push_data(messages)
    }
});


job.start();


