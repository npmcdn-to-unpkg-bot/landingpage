FROM httpd:2.4
COPY ./app/ /usr/local/apache2/htdocs/
COPY ./conf/ /usr/local/apache2/conf/

EXPOSE 443
CMD ["httpd-foreground"]
