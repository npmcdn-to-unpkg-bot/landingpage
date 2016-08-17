FROM httpd:2.4

RUN tar -xzf ./target/*.tar.gz -C /usr/local/apache2/htdocs

COPY ./conf/ /usr/local/apache2/conf/

EXPOSE 443
CMD ["httpd-foreground"]