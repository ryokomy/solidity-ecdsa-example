const execSync = require('child_process').execSync
const Web3 = require('web3');

const program = require("commander");

const programProcess = () => {
    program
    .option('-n, --network [n]', 'Must add network option', 'local')
    .parse(process.argv);
 
    if (process.argv.length < 2) {
        program.help();
    }

    console.log('network: ' + program.network)
}

let execCommand = (command) => {
    execSync(command, (err, stdout, stderr) => {
        if (err) { console.log(stderr) }
        console.log(stdout)
    });
}

// *************************************************************************
// args
programProcess()

// web3
let web3 = new Web3();
if(program.network == 'local') {
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));
}

// account
const ownerAccount = web3.eth.accounts.privateKeyToAccount(`<First account's private key in your Ganache>`)
const proxyAdminAccount = web3.eth.accounts.privateKeyToAccount(`<Second account's private key in your Ganache>`)
web3.eth.accounts.wallet.add(ownerAccount); // web3.eth.accounts.wallet[0] == ownerAccount
web3.eth.accounts.wallet.add(proxyAdminAccount);
web3.eth.defaultAccount=web3.eth.accounts[0] // default is owner

// export
module.exports.execCommand = execCommand
module.exports.network = program.network
module.exports.web3 = web3
module.exports.account = {
    admin: proxyAdminAccount.address,
    owner: ownerAccount.address
}
module.exports.projectName = 'solidity-ecdsa-example'
