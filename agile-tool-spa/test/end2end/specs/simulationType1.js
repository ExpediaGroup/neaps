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

// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'run two simulations kanban type 1 with one leg': function (browser) {
    browser
    .useXpath()
    .url('http://localhost:8081')
      .waitForElementVisible('//*[@id="simulatioTypeSelect"]', 5000)
      .assert.elementPresent('//*[@id="simulatioTypeSelect"]')
      .click('//*[@id="simulatioTypeSelect"]/option[@value="0"]')
      .assert.cssClassPresent('//*[@id="cta_button"]', 'disabled')
      .setValue('//*[@id="leg0_sample"]', '1,2,3,4,5')
      .setValue('//*[@id="leg0_target"]', '5')
      .setValue('//*[@id="leg0_wip"]', '5')
      .assert.cssClassNotPresent('//*[@id="cta_button"]', 'disabled')
      .click('//*[@id="cta"]')
      .waitForElementVisible('//*[@id="ticket0"]', 5000)
      .assert.elementPresent('//*[@id="ticket0"]')
      // .pause(15000)
      // .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr')
      .waitForElementVisible('//*[@id="ticket0"]/table/tbody/tr', 50000)
      .end()
  },
  'run two simulations kanban type 1 with one no montecarlo leg': function (browser) {
    browser
    .useXpath()
    .url('http://localhost:8081')
      .waitForElementVisible('//*[@id="simulatioTypeSelect"]', 5000)
      .assert.elementPresent('//*[@id="simulatioTypeSelect"]')
      .click('//*[@id="simulatioTypeSelect"]/option[@value="0"]')
      .assert.cssClassPresent('//*[@id="cta_button"]', 'disabled')
      .setValue('//*[@id="leg0_sample"]', '3')
      .setValue('//*[@id="leg0_target"]', '5')
      .setValue('//*[@id="leg0_wip"]', '5')
      .assert.cssClassNotPresent('//*[@id="cta_button"]', 'disabled')
      .click('//*[@id="cta"]')
      .waitForElementVisible('//*[@id="ticket0"]', 5000)
      .assert.elementPresent('//*[@id="ticket0"]')
      // .pause(15000)
      // .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr')
      .waitForElementVisible('//*[@id="ticket0"]/table/tbody/tr', 50000)
      .assert.cssClassPresent('//*[@id="ticket0"]/table/tbody/tr', 'montecarlo')
      .end()
  },
  'run one simulation kanban type 1 with two standard legs ': function (browser) {
    browser
    .useXpath()
    .url('http://localhost:8081')
      .waitForElementVisible('//*[@id="simulatioTypeSelect"]', 5000)
      .assert.elementPresent('//*[@id="simulatioTypeSelect"]')
      .click('//*[@id="simulatioTypeSelect"]/option[@value="0"]')
      .assert.cssClassPresent('//*[@id="cta_button"]', 'disabled')
      .waitForElementVisible('//a[@id="addLeg"]', 5000)
      .click('//a[@id="addLeg"]')
      .setValue('//*[@id="leg0_sample"]', '1,2,3')
      .setValue('//*[@id="leg0_target"]', '5')
      .setValue('//*[@id="leg0_wip"]', '5')
      .assert.cssClassPresent('//*[@id="cta_button"]', 'disabled')
      .setValue('//*[@id="leg1_sample"]', '4,5,6')
      .setValue('//*[@id="leg1_target"]', '5')
      .setValue('//*[@id="leg1_wip"]', '5')
      .assert.cssClassNotPresent('//*[@id="cta_button"]', 'disabled')
      .click('//*[@id="cta"]')
      .waitForElementVisible('//*[@id="ticket0"]', 5000)
      // .pause(30000)
      // .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line0"]')
      // .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]')
      .waitForElementVisible('//*[@id="ticket0"]/table/tbody/tr[@id="line0"]', 50000)
      .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]')
      .end()
  },
  'run one simulation kanban type 1 with two no montecarlo legs': function (browser) {
    browser
    .useXpath()
    .url('http://localhost:8081')
      .waitForElementVisible('//*[@id="simulatioTypeSelect"]', 5000)
      .assert.elementPresent('//*[@id="simulatioTypeSelect"]')
      .click('//*[@id="simulatioTypeSelect"]/option[@value="0"]')
      .assert.cssClassPresent('//*[@id="cta_button"]', 'disabled')
      .waitForElementVisible('//a[@id="addLeg"]', 5000)
      .click('//a[@id="addLeg"]')
      .setValue('//*[@id="leg0_sample"]', '1')
      .setValue('//*[@id="leg0_target"]', '5')
      .setValue('//*[@id="leg0_wip"]', '5')
      .assert.cssClassPresent('//*[@id="cta_button"]', 'disabled')
      .setValue('//*[@id="leg1_sample"]', '3')
      .setValue('//*[@id="leg1_target"]', '5')
      .setValue('//*[@id="leg1_wip"]', '5')
      .assert.cssClassNotPresent('//*[@id="cta_button"]', 'disabled')
      .click('//*[@id="cta"]')
      .waitForElementVisible('//*[@id="ticket0"]', 5000)
      // .pause(30000)
      // .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line0"]')
      // .assert.cssClassPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line0"]', 'montecarlo')
      // .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]')
      // .assert.cssClassPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]', 'montecarlo')
      .waitForElementVisible('//*[@id="ticket0"]/table/tbody/tr[@id="line0"]', 50000)
      .assert.cssClassPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line0"]', 'montecarlo')
      .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]')
      .assert.cssClassPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]', 'montecarlo')
      .end()
  },
  'run one simulation kanban type 1 with one standars leg and one no montecarlo leg': function (browser) {
    browser
    .useXpath()
    .url('http://localhost:8081')
      .waitForElementVisible('//*[@id="simulatioTypeSelect"]', 5000)
      .assert.elementPresent('//*[@id="simulatioTypeSelect"]')
      .click('//*[@id="simulatioTypeSelect"]/option[@value="0"]')
      .assert.cssClassPresent('//*[@id="cta_button"]', 'disabled')
      .waitForElementVisible('//a[@id="addLeg"]', 5000)
      .click('//a[@id="addLeg"]')
      .setValue('//*[@id="leg0_sample"]', '1,2,3')
      .setValue('//*[@id="leg0_target"]', '5')
      .setValue('//*[@id="leg0_wip"]', '5')
      .assert.cssClassPresent('//*[@id="cta_button"]', 'disabled')
      .setValue('//*[@id="leg1_sample"]', '3')
      .setValue('//*[@id="leg1_target"]', '5')
      .setValue('//*[@id="leg1_wip"]', '5')
      .assert.cssClassNotPresent('//*[@id="cta_button"]', 'disabled')
      .click('//*[@id="cta"]')
      .waitForElementVisible('//*[@id="ticket0"]', 5000)
      // .pause(30000)
      // .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line0"]')
      // .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]')
      // .assert.cssClassPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]', 'montecarlo')
      .waitForElementVisible('//*[@id="ticket0"]/table/tbody/tr[@id="line0"]', 50000)
      .assert.elementPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]')
      .assert.cssClassPresent('//*[@id="ticket0"]/table/tbody/tr[@id="line1"]', 'montecarlo')
      .end()
  }
}
