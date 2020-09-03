import knex from 'knex'
import path from 'path'

const conn = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..', 'database', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    pool: {
        afterCreate(conn: { run: (arg0: string, arg1: any) => void }, cb: any) {
            conn.run('PRAGMA foreign_keys = ON', cb)
        }
    },
    useNullAsDefault: true
})

export default conn