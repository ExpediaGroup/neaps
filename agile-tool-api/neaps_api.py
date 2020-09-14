# -*- coding: utf-8 -*-

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

""" Quantag API """
from flask import (Flask,
                   request,
                   jsonify,
                   make_response)

#from flask.ext.cors import CORS

import numpy as np
from neaps_lib.functions import analyze_data, collect_data

def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_pyfile(config_filename)

    @app.route('/check')
    def healthcheck():
        """ Healthcheck uri """
        res = make_response("OK", 200)
        return res

    @app.route('/api', methods=['POST'])
    def api():
        """ API uri """
        data = request.get_json(force=False, silent=False, cache=False)
        simulations = process_data(data, int(data['fun']))
        data = analyze_data(simulations, 3, [55., 75., 95.])
        return jsonify(data)

    return app

def process_data(data, fun):
    """ Collect Data trough standard functions """
    predstot = int(data['predstot'])
    runstot = int(data['runstot'])
    fun = int(data['fun'])

    chunksin = data['chunks']

    for chunk in chunksin:
        chunk['sample'] = [np.float64(x) for x in chunk['sample'].split(',')]
        chunk['wip'] = int(chunk['wip'])
        chunk['runsdim'] = int(chunk['runsdim'])
        chunk['td_low_bound'] = float(chunk['td_low_bound'])
        chunk['td_high_bound'] = float(chunk['td_high_bound'])

    return collect_data(predstot, runstot, chunksin, fun)

if __name__ == '__main__':
    neaps_app = create_app('production.cfg')
    neaps_app.run()
