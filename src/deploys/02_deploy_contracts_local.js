const common = require('../common')
const execCommand = common.execCommand
const network = common.network
const account = common.account

let pipeline = async () => {

    // session
    execCommand(`npx zos session --network ${network} --from ${account.admin}`)

    // Deploy RequestProcessor
    execCommand('npx zos add EcdsaContract')
    execCommand('npx zos push')
    execCommand(`npx zos create EcdsaContract --init initialize`)
    
}

let main = async () => {
    console.log('----------- start pipeline -----------')
    await pipeline()
    .catch(err => {
        console.error(err)
    })
    console.log('----------- finish pipeline -----------')
}

main()