import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, '..', '..', '.env')})

const knexConfig = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, '..', 'database', 'database.sqlite')
        },
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, '..', 'database', 'seeds')
        },
        useNullAsDefault: true,
        pool: {
            afterCreate(conn: { run: (sql: string, cb: any) => void }, cb: any) {
                conn.run('PRAGMA foreign_keys = ON', cb)
            }
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, '..', 'database', 'seeds')
        }
    },
    test: {
        client: 'sqlite3',
        connection: ':memory:',
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, '..', 'database', 'seeds')
        },
        useNullAsDefault: true,
        pool: {
            afterCreate(conn: { run: (sql: string, cb: any) => void }, cb: any) {
                conn.run('PRAGMA foreign_keys = ON', cb)
            }
        }
    }
}

export default knexConfig

module.exports = knexConfig