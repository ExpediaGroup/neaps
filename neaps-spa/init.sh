#!/bin/sh
touch /var/log/nginx/access.log
touch /var/log/nginx/error.log
tail -n 0 -f /var/log/nginx/*.log &

echo Starting nginx.
exec /usr/sbin/nginx -c /home/neaps_spa/nginx.conf "$@"
