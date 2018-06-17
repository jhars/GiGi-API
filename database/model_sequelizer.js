const express = require('express');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config_env = require(`./config.json`)[env];
const db = {};
const models_dir = '/Users/macpan/dev/APPS/GiGi/API/GiGi-API/server/models'


let sequelize;
if (config_env.use_env_variable) {
  sequelize = new Sequelize(process.env[config_env.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config_env.database, config_env.username, config_env.password, config_env
  );
}

console.log('PATH.basename... new: ' + path.basename(models_dir));

fs
  .readdirSync('/Users/macpan/dev/APPS/GiGi/API/GiGi-API/server/models')
  .filter((file) =>
    (file.indexOf('.') !== 0) &&
    (file !== 'index.js') &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(models_dir + '/' + file);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
