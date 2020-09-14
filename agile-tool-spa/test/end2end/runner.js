/*

Copyright 2018 Expedia Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// 1. start the dev server using production config
function fun1() {
  process.env.NODE_ENV = 'testing'
  var server = require('../../build/dev-server.js')
  return server
}
// 2. run the nightwatch test suite against it
// to run in additional browsers:
//    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
//    2. add it to the --env flag below
// or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
// For more information on Nightwatch's config file, see
// http://nightwatchjs.org/guide#settings-file

function fun2(server) {
  var opts = process.argv.slice(2)
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'test/end2end/nightwatch.conf.js'])
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome'])
  }

  var spawn = require('cross-spawn')
  var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })

  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server.close()
    throw err
  })
}

var server = fun1()

setTimeout(fun2, 20000, server);

