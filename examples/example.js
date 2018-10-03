var MouthPyc = require('../lib/core.js')
var keypress = require('keypress');
const fetch = require('node-fetch')



var hello = new MouthPyc({
    verbose: true
})


// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.exit(0)
    }

    randomText()

});


var randomText = async function () {
    let gib = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json()
        })
        .then(
            json => {
                return json.joke
            })
    hello.addToQueue({
        message: gib,
        done: false
    })

}

randomText()

process.stdin.setRawMode(true);
process.stdin.resume();