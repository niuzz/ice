'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.connect('mongodb://127.0.0.1:27017/sandra');
  const Schema = mongoose.Schema;

  const MinaUserSchema = new Schema({});

  return mongoose.model('MinaUser', MinaUserSchema);
};
