FROM alpine:latest
EXPOSE 3031
USER root

RUN apk add --update py3-flask py3-numpy uwsgi uwsgi-python3 uwsgi-corerouter uwsgi-http
RUN rm -rf /home/neaps_api
RUN mkdir /home/neaps_api
RUN cd /home/neaps_api && /usr/bin/python3 -m venv neapsenv && source neapsenv/bin/activate && pip install --no-deps flask-cors

COPY neaps_lib/* /home/neaps_api/neaps_lib/
COPY pytest.ini /home/neaps_api/pytest.ini
COPY uwsgi.ini /home/neaps_api/uwsgi.ini
COPY apionly.ini /home/neaps_api/apionly.ini
COPY neaps_api.py /home/neaps_api/neaps_api.py
COPY wsgi.py /home/neaps_api/wsgi.py
COPY init.sh /home/neaps_api/init.sh
COPY production.cfg /home/neaps_api/production.cfg

RUN chmod 755 /home/neaps_api/init.sh

ENTRYPOINT ["/home/neaps_api/init.sh"]
