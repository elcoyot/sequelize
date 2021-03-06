var config    = require("./config/config")
  , Sequelize = require("../index")
  , sequelize = new Sequelize(config.database, config.username, config.password, { logging: false })
  , Helpers   = new (require("./config/helpers"))(sequelize)
  , Migrator  = require("../lib/migrator")
  , Migration = require("../lib/migration")
  , _         = Sequelize.Utils._

describe('Migration', function() {
  describe('migrationHasInterfaceCalls', function() {
    var migrator  = new Migrator(sequelize)
      , migration = new Migration(migrator, '/var/lib/20111117063700-asd.js')

    var tests = [
      {
        topic: function(migration, DataTypes) {
          migration.createTable()
        },
        expectation: true
      },
      {
        topic: function(migration, DataTypes) {
          // migration.createTable()
        },
        expectation: false
      },
      {
        topic: function(migration, DataTypes) {
          migration
            .createTable()
        },
        expectation: true
      },
      {
        topic: function(migration, DataTypes) {
          migration.
            createTable()
        },
        expectation: true
      },
      {
        topic: function(migration, DataTypes) {
          migration . createTable ()
        },
        expectation: true
      }
    ]

    tests.forEach(function(test) {
      it('correctly result in ' + test.expectation + ' for ' + test.topic.toString(), function() {
        expect(migration.migrationHasInterfaceCalls(test.topic)).toEqual(test.expectation)
      })
    })
  })
})
