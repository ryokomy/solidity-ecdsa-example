# solidity-ecdsa-example

## How to Use

1. install package
```
git clone git@github.com:ryokomy/solidity-ecdsa-example.git
cd solidity-ecdsa-example
npm install
```

2. replace the followings with your pravake keys in src/common.js

**Note: prefix '0x'**

``` :.js
const ownerAccount = web3.eth.accounts.privateKeyToAccount(`<First account's private key in your Ganache>`)
const proxyAdminAccount = web3.eth.accounts.privateKeyToAccount(`<Second account's private key in your Ganache>`)
```

3. run
```
node src/deploys/01_init_zos.js
node src/deploys/02_deploy_contracts_local.js
```
