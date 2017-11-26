/**
 * Created by niuzz on 17/11/26.
 */
require('babel-core/register')({
  'presets': [
    'stage-3',
    'latest-node'
  ]
})

require('babel-polyfill')
require('./server')
