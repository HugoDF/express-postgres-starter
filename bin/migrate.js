const path = require('path')
const migrate = require('migrate')

const stateStore = require('../express/db/postgres-state-storage.js')
const migrationsDirectory = path.resolve(__dirname, '../express/migrations')

const [command] = process.argv.slice(2)

new Promise((resolve, reject) => {
  migrate.load(
    {
      stateStore,
      migrationsDirectory
    },
    function(err, set) {
      if (err) {
        reject(err)
      }
      if (typeof set[command] !== 'function') {
        reject(new Error('Command is not a function'))
      }
      set[command](function(err) {
        if (err) reject(err)
        resolve()
      })
    }
  )
})
  .then(() => {
    console.log(`migrations "${command}" successfully ran`)
    process.exit(0)
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
