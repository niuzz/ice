/**
 * Created by niuzz on 17/11/26.
 */
import mongoose from 'mongoose'
import config from '../conf'
import fs from 'fs'
const models = resolve(__dirname, '../database/schema')
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\\.].*js$/))
  .forEach(file => require(resolve(models, file)))
export const database = app => {
  mongoose.set('debug', true)
  mongoose.connect(config.db)
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })
  mongoose.connection.on('err', err => {
    console.error(err)
  })
  mongoose.connection.on('open', async => {
    console.log('connected mongoDB', config.db)
  })
}
