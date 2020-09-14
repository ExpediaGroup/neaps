#
# Copyright 2018 Expedia Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

""" test neaps api /get and /api endpoint """
import os
import logging
import json
import unittest
import sys
import copy

import numpy as np
from neaps_api import create_app
app = create_app(os.environ['FLASK_CONFIG'])

test_cases = [
    # FUN 0 TESTS
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.0,
                "td_high_bound": 0.0
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 0
    },
    {
        "chunks":
        [
            {
                "sample": "3,3,3",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.0,
                "td_high_bound": 0.0
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 0
    },
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 0
    },
    {
        "chunks":
        [
            {
                "sample": "3,3,3",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 0
    },
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
            {
                "sample": "1,2,3",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 0
    },
    {
        "chunks":
        [
            {
                "sample": "3,3,3",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
            {
                "sample": "5,6,7",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 0
    },
    #FUN 1 TESTS
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.0,
                "td_high_bound": 0.0
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 1
    },
    {
        "chunks":
        [
            {
                "sample": "3,3,3",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.0,
                "td_high_bound": 0.0
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 1
    },
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 1
    },
    {
        "chunks":
        [
            {
                "sample": "3,3,3",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 1
    },
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
            {
                "sample": "6,7,8",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 1
    },
    {
        "chunks":
        [
            {
                "sample": "9,9,9",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
            {
                "sample": "5,6,7",
                "runsdim": 10,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 1
    },
    #FUN 2 TESTS
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 20,
                "wip": 1,
                "td_low_bound": 0.0,
                "td_high_bound": 0.0
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 2
    },
    {
        "chunks":
        [
            {
                "sample": "3,3,3",
                "runsdim": 20,
                "wip": 1,
                "td_low_bound": 0.0,
                "td_high_bound": 0.0
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 2
    },
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 20,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 2
    },
    {
        "chunks":
        [
            {
                "sample": "3,3,3",
                "runsdim": 20,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 2
    },
    {
        "chunks":
        [
            {
                "sample": "5,6,7",
                "runsdim": 20,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
            {
                "sample": "6,7,8",
                "runsdim": 20,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 2
    },
    {
        "chunks":
        [
            {
                "sample": "9,9,9",
                "runsdim": 20,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
            {
                "sample": "5,6,7",
                "runsdim": 20,
                "wip": 1,
                "td_low_bound": 0.2,
                "td_high_bound": 0.4
            },
        ],
        "predstot": 100,
        "runstot": 1000,
        "fun": 2
    }
]

class HealthCheckTestCase(unittest.TestCase):
    """ Checking /check endpoint """
    def setUp(self):
        """ Checking /check endpoint: setup """
        self.app = app.test_client()
        self.check = self.app.get('/check')

    def test_health_check(self):
        """ Checking /check endpoint: checking content """
        self.assertEqual(b'OK', self.check.data)

    def test_status(self):
        """ Checking /check endpoint: response status code """
        self.assertEqual(self.check.status_code, 200)

class ApiTestCase(unittest.TestCase):
    """ Checking /api endpoint """
    def setUp(self):
        """ Checking /api endpoint setup """
        self.app = app.test_client()

        self.responses = []
        self.data = []
        self.requests = []

        log = logging.getLogger("ApiTestCase.setUp")

        for (i, request) in enumerate(test_cases):
            log.debug('REQUEST %s= %r', i+1, request)
            self.requests.append(request)

            http_response = self.app.post('/api',
                                          data=json.dumps(request),
                                          content_type='application/json',
                                          follow_redirects=True)
            self.responses.append(http_response)
            log.debug('RESPONSE= %r', http_response)

            http_response_data = json.loads(http_response.get_data())
            self.data.append(http_response_data)
            log.debug('DATA= %r\n', http_response_data)

        self.requests_modified = copy.deepcopy(self.requests)
        for (i, request) in enumerate(self.requests_modified):
            for (j, chunk) in enumerate(self.requests_modified[i]['chunks']):
                if j < (len(self.data[i]['table']) - 1):
                    chunk['sample'] = [np.float64(x) for x in chunk['sample'].split(',')]
                    chunk['predsdim'] = int(len(chunk['sample']) / 4) + 1
                    chunk['fun'] = self.requests[i]['fun']
                    chunk['runstot'] = self.requests[i]['runstot']
                    chunk['predstot'] = self.requests[i]['predstot']

    def test_status(self):
        """ Checking /api endpoint: response status code """
        for i in range(len(self.responses)):
            print(self.responses[i])
            print(self.responses[i].status_code)
            self.assertEqual(self.responses[i].status_code, 200, msg="status code")

    def test_request(self):
        """ Checking /api endpoint: response request """
        for (i, request) in enumerate(self.requests_modified):
            for (j, chunk) in enumerate(request['chunks']):
                if j < (len(self.data[i]['table']) - 1):
                    self.assertDictEqual(chunk, self.data[i]['table'][j]['request'], msg='request integrity')

    def test_montecarlo(self):
        """ Checking /api endpoint: response request """
        for (i, request) in enumerate(self.requests_modified):
            for (j, chunk) in enumerate(request['chunks']):
                if j < (len(self.data[i]['table']) - 1):
                    if np.var(chunk['sample']) == .0:
                        self.assertEqual(self.data[i]['table'][j]['montecarlo'], False, msg='montecarlo true')
                    else:
                        self.assertEqual(self.data[i]['table'][j]['montecarlo'], True, msg='montecarlo false')

    def test_shortest_longest(self):
        """ Checking /api endpoint: response request """
        for (i, request) in enumerate(self.requests_modified):
            for (j, chunk) in enumerate(request['chunks']):
                if len(self.data[i]['table']) > 2:
                    if j < (len(self.data[i]['table']) - 1):
                        print(self.data[i]['table'][j])
                        if chunk['sample'] == [5, 6, 7]:
                            self.assertEqual(self.data[i]['table'][j]['longest'], True, msg='longest true')
                            self.assertEqual(self.data[i]['table'][j]['shortest'], False, msg='shortest false')
                        else:
                            self.assertEqual(self.data[i]['table'][j]['shortest'], True, msg='shortest true')
                            self.assertEqual(self.data[i]['table'][j]['longest'], False, msg='longest false')

    def test_names(self):
        """ Checking /api endpoint: response request """
        for (i, request) in enumerate(self.requests_modified):
            for (j, chunk) in enumerate(request['chunks']):
                if len(self.data[i]['table']) == 1:
                    self.assertEqual(self.data[i]['table'][j]['name'], 'Tot', msg='name single')
                else:
                    if j == 0:
                        self.assertEqual(self.data[i]['table'][j]['name'], '1', msg='name one')
                    elif j == 1:
                        self.assertEqual(self.data[i]['table'][j]['name'], '2', msg='name two')
                    else:
                        self.assertEqual(self.data[i]['table'][j]['name'], 'Tot', msg='name tot')


if __name__ == '__main__':
    logging.basicConfig(stream=sys.stderr)
    logging.getLogger().setLevel(logging.DEBUG)
    unittest.main()
