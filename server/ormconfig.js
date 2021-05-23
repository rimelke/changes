const configs = {
  development: {
    type: 'sqlite',
    database: './src/database/database.sqlite',
    migrations: ['./src/database/migrations/*.ts'],
    entities: ['./src/entities/*.ts'],
    logging: false,
    cli: {
      migrationsDir: './src/database/migrations'
    }
  },

  production: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: ['./build/database/migrations/*.js'],
    entities: ['./build/entities/*.js'],
    logging: false,
    cli: {
      migrationsDir: './build/database/migrations'
    }
  },

  test: {
    type: 'sqlite',
    database: ':memory:',
    migrations: ['./src/database/migrations/*.ts'],
    entities: ['./src/entities/*.ts'],
    logging: false,
    cli: {
      migrationsDir: './src/database/migrations'
    }
  }
}

module.exports = configs[process.env.NODE_ENV || 'development']
