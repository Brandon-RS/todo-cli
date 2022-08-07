require('colors')

const {
  inquirerMenu,
  stop,
  readInput
} = require('./helpers/inquirer')
const { saveDB, readDB } = require('./helpers/saveFile')
const { Tasks } = require('./models/tasks')

// * Content *

console.clear()

const main = async () => {

  let opt = ''
  const tasks = new Tasks()

  const tasksDB = readDB()

  if (tasksDB) {
    // TODO: Establecer las tareas!
  }

  do {

    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        const desc = await readInput('Description: ')
        tasks.createTask(desc)
        break
      case '2':
        console.log(tasks.listArr)
        break
    }

    // saveDB(tasks.listArr)

    if (opt !== '0') await stop()
    else console.clear()

  } while (opt !== '0');

}

main()
