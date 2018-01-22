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

require('babel-register')

// http://nightwatchjs.org/guide#settings-file
module.exports = {
  "src_folders": ["test/end2end/specs"],
  "output_folder": "test/end2end/reports",
  "custom_assertions_path": ["test/end2end/custom-assertions"],

  "selenium": {
    "start_process": false,
    // "server_path": "node_modules/selenium-server/lib/runner/selenium-server-standalone-3.8.1.jar",
    // "host": "127.0.0.1",
    // "port": 4444,
    // "cli_args": {
    //   "webdriver.chrome.driver": require('chromedriver').path
    // }
  },

  "test_settings": {
    "default": {
      //"launch_url": "https://localhost:4445",
      "selenium_port": 4445,
      "selenium_host": "localhost",
      "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER,
      "build": process.env.TRAVIS_BUILD_NUMBER,
      "username": process.env.SAUCE_USERNAME,
      "access_key": process.env.SAUCE_ACCESS_KEY,
      "silent": true,
      "screenshots": {
        "enabled": false,
        "on_failure": false,
        "on_error": false,
        "path": ""
      },
      "globals": {
        "waitForConditionTimeout": 10000,
      },
    },

    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "platform": "Windows 10",
        "version": "63",
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
      }
    },

    "ie11": {
      "desiredCapabilities": {
        "browserName": "internet explorer",
        "platform": "Windows 10",
        "version": "11.0",
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
      }
    }
  }
}
