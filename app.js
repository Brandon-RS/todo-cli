require('colors')

const {
  inquirerMenu,
  stop,
  readInput,
  listTasksForDelete,
  confirm,
  showCheckList
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
    tasks.loadTasksFromArray(tasksDB)
  }

  do {

    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        const desc = await readInput('Description: ')
        if (desc) {
          tasks.createTask(desc)
        }
        break
      case '2':
        tasks.completeList(tasks.listArr)
        break
      case '3':
        tasks.listCompletedPending()
        break
      case '4':
        tasks.listCompletedPending(false)
        break

      case '5':
        const ids = await showCheckList(tasks.listArr)
        tasks.toggleCompleted(ids)
        break

      case '6':
        const id = await listTasksForDelete(tasks.listArr)
        if (id !== '0') {
          const ok = await confirm('Are you sure?')
          if (ok) tasks.deleteTask(id)
        }
        break
    }

    saveDB(tasks.listArr)

    const excludes = ['0', '1', '5', '6']
    if (!excludes.includes(opt)) await stop()
    else console.clear()

  } while (opt !== '0');

}

main()
