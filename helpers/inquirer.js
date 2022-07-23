require('colors')
const inquirer = require('inquirer')

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      { value: '1', name: '1. Create new task' },
      { value: '2', name: '2. List all tasks' },
      { value: '3', name: '3. List completed tasks' },
      { value: '4', name: '4. List pending tasks' },
      { value: '5', name: '5. Complete task(s)' },
      { value: '6', name: '6. Delete task' },
      { value: '0', name: '0. Exit' },
    ]
  }
]

const inquirerMenu = async () => {

  console.clear()

  console.log('==========================='.green)
  console.log('     Select an option  '.green)
  console.log('===========================\n'.green)

  const { option } = await inquirer.prompt(questions)

  return option

}

const stop = async () => {

  const question = [
    {
      type: 'input',
      name: 'stop',
      message: `Press ${'ENTER'.green} to continue:`
    }
  ]

  const { stop } = await inquirer.prompt(question)

  return stop

}

module.exports = {
  inquirerMenu,
  stop
}
