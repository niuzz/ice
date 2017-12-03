/**
 * Created by niuzz on 17/11/26.
 */
import mongoose from 'mongoose'
import { resolve } from 'path'
import config from '../conf'
import fs from 'fs'
let models = resolve(__dirname, '../database/schema')
// 同步读入目录文件
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
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
  mongoose.connection.on('open', async () => {
    console.log('connected mongoDB', config.db)
  })
}
