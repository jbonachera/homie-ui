FROM jbonachera/arch
EXPOSE 80
RUN pacman -S --noconfirm nginx
COPY dist/ /usr/share/nginx/html/
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
