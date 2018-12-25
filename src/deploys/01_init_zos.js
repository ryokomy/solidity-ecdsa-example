const common = require('../common')
const execCommand = common.execCommand

let pipeline = async () => {

    // remove old version
    execCommand('rm -f zos.json')
    execCommand('rm -f zos.*.json')
    execCommand('rm -rf build')

    // Initialize project
    // NOTE: Creates a zos.json file that keeps track of the project's details
    execCommand('npx zos init ' + common.projectName)
}

let main = async () => {
    console.log('----------- start pipilen -----------')
    await pipeline()
    console.log('----------- finish pipilen -----------')
}

main()