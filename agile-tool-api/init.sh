#!/bin/sh
echo Starting tail.
touch /home/neaps_api/neaps_api.log
tail -n 0 -f /home/neaps_api/neaps_api.log &

echo Starting uwsgi.
if [ "$APIONLY" == true ] ; then
  echo Starting on http.
  /usr/sbin/uwsgi --uid uwsgi --gid uwsgi --ini /home/neaps_api/apionly.ini "$@"
else
  echo Starting on socket.
  /usr/sbin/uwsgi --uid uwsgi --gid uwsgi --ini /home/neaps_api/uwsgi.ini "$@"
fi
