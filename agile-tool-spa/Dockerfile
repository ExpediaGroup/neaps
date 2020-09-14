FROM alpine:edge
EXPOSE 80
USER root

RUN apk add --update nginx
RUN rm -rf /home/neaps_spa
RUN mkdir /home/neaps_spa

COPY dist/ /home/neaps_spa/static/
COPY init.sh /home/neaps_spa/init.sh
COPY nginx.conf /home/neaps_spa/nginx.conf

RUN chmod 755 /home/neaps_spa/init.sh

ENTRYPOINT  ["/home/neaps_spa/init.sh"]
