require('colors')

const { Task } = require("./task")

class Tasks {

  _list = {}

  get listArr() {

    const list = []
    Object.keys(this._list).forEach(key => {
      const task = this._list[key]
      list.push(task)
    })

    return list
  }

  constructor() {
    this._list = {}
  }

  createTask(description = '') {
    const task = new Task(description)
    this._list[task.id] = task
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id]
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach(task => {
      this._list[task.id] = task
    })
  }

  completeList(tasks) {
    tasks.forEach((task, i) => {

      const index = `${i + 1}.`.green
      const { description, completedIn } = task
      const done = completedIn ? 'Completed'.green : 'Pending'.red

      console.log(`${index} ${description} \t:: ${done} `)
    })
  }

  completeUniqueList(tasks) {
    tasks.forEach((task, i) => {

      const index = `${i + 1}.`.green
      const { description, completedIn } = task
      const done = completedIn ? task.completedIn.split('T')[0].green : 'Pending'.red

      console.log(`${index} ${description} \t:: ${done} `)
    })
  }

  listCompletedPending(completed = true) {
    let comp = [], pend = []
    this.listArr.forEach((task) => {
      task.completedIn ? comp.push(task) : pend.push(task)
    })
    completed ? this.completeUniqueList(comp) : this.completeUniqueList(pend)
  }

  toggleCompleted(ids = []) {

    ids.forEach(id => {
      const task = this._list[id]
      if (!task.completedIn) {
        task.completedIn = new Date().toISOString()
      }
    })

    this.listArr.forEach(task => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedIn = null
      }
    })
    
  }

}

module.exports = {
  Tasks
}