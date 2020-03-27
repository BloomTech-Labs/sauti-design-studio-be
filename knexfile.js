// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_CON,
    // connection: {
    //   host : process.env.POSTGRES_HOST,
    //   user : process.env.POSTGRES_USER,
    //   password : process.env.POSTGRES_PASSWORD,
    //   database : process.env.POSTGRES_DATABASE_NAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
  testing: {
    client: 'postgresql',
    connection: process.env.TEST_CON,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },
};
