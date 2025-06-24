require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: false
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: console.log,
  },
  test: {
    url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: false
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false,
  },
};