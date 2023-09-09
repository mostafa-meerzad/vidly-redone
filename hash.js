const bcrypt = require("bcrypt")

async function run(){

    const rounds = 10
    const salt = await bcrypt.genSalt(rounds)
    const hash = await bcrypt.hash('1234', salt )
    console.log(salt)
    console.log(hash)
}

run()