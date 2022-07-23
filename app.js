require('colors')

const { inquirerMenu, stop } = require('./helpers/inquirer')

// * Content *

console.clear()

const main = async () => {

  let opt = ''

  do {

    opt = await inquirerMenu()
    if (opt !== '0') await stop()

  } while (opt !== '0');

}

main()
