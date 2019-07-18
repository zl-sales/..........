From nginx
WORKDIR /usr/share/nginx
ADD nginx/nginx.conf /etc/nginx/
# env MAX_BODY_SIZE 200m
COPY ./dist/. /usr/share/nginx/html/
#COPY ./nginx/conf.d/. /etc/nginx/conf.d/.
#RUN mkdir log
EXPOSE 80