const common = require('../common')
const account = common.account

// web3
const web3 = common.web3

// // abi
let ecdsa_contract_abi = require('../../build/contracts/EcdsaContract.json').abi

// read zos.rinkeby.json
let zos_local_json = require('../../zos.dev-5777.json')
let ecdsa_contract_address = zos_local_json.proxies['solidity-ecdsa-example/EcdsaContract'][0].address

// contract
const EcdsaContract = new web3.eth.Contract(ecdsa_contract_abi, ecdsa_contract_address)
for(let contract of [EcdsaContract]){
    contract.options.from = account.owner; // default from address
    contract.options.gasPrice = '10000000000'; // default gas price in wei (10 Gwei)
    contract.options.gas = 6000000; // provide as fallback always 6M gas
}

// main process pipeline
let pipeline = async () => {
    {

        // massage
        let message = {
            tokenId: 1,
            value: web3.utils.toWei('1', 'ether'),
            expirationTime: 1545663600
        }

        // sign
        console.log(`---- sing ----`)
        let messageHash = web3.utils.soliditySha3(message.tokenId, message.value, message.expirationTime)
        console.log(`messageHash: ${messageHash}`)
        let signature = await web3.eth.sign(messageHash, web3.eth.accounts.wallet[0].address)
        console.log(`signature: ${signature}`)
        console.log()

        // verify locally
        console.log(`---- verify locally ----`)
        let verifiedAddress = await web3.eth.accounts.recover(messageHash, signature)
        // let verifiedAddress = await web3.eth.accounts.recover(web3.eth.accounts.hashMessage(messageHash), signature, true)
        console.log(`signedAddress: ${web3.eth.accounts.wallet[0].address}`)
        console.log(`verifiedAddress: ${verifiedAddress}`)
        console.log()

        // pass data to contract
        console.log(`---- pass data to solidity ----`)
        await EcdsaContract.methods.setData(message.tokenId, message.value, message.expirationTime, signature, account.owner).send()
        .catch(err => {throw err})
        // console.log(tx)
        let tokenId_solidity = await EcdsaContract.methods.tokenId().call()
        .catch(err => {throw err})
        console.log(`tokenId in solidity: ${tokenId_solidity}`)
        let value_solidity = await EcdsaContract.methods.value().call()
        .catch(err => {throw err})
        console.log(`value in solidity: ${value_solidity}`)
        let expirationTime_solidity = await EcdsaContract.methods.expirationTime().call()
        .catch(err => {throw err})
        console.log(`expirationTime in solidity: ${expirationTime_solidity}`)
        let signature_solidity = await EcdsaContract.methods.signature().call()
        .catch(err => {throw err})
        console.log(`signature in solidity: ${signature_solidity}`)
        let owner_solidity = await EcdsaContract.methods.owner().call()
        .catch(err => {throw err})
        console.log(`ownerAddress in solidity: ${owner_solidity}`)
        console.log()


        console.log(`---- verify on solidity ----`)
        await EcdsaContract.methods.verifySignature().send()
        .catch(err => {throw err})
        // console.log(tx)
        let messageHash_solidity = await EcdsaContract.methods.messageHash().call()
        .catch(err => {throw err})
        console.log(`messageHash in solidity: ${messageHash_solidity}`)
        let verifiedAddress_solidity = await EcdsaContract.methods.verifiedAddress().call()
        .catch(err => {throw err})
        console.log(`verifiedAddress in solidity: ${verifiedAddress_solidity}`)

    }
}

let main = async () => {
    await pipeline()
}

main()