############################################################
############################################################
# Code Building Stage

FROM node:lts-hydrogen as builder

RUN apt-get update

# Create app directory
WORKDIR /usr/src/app

# Copy source to workdir
COPY . .

# Install dependencies
RUN npm clean-install

# Build distribution
RUN npm run build

############################################################
############################################################
# Build Image Stage

FROM ubuntu:18.04
LABEL version="0.1.0"

ENV UNITY_WWW_ROOT=/var/www/unity-ui
ENV ENTRYPOINT_FOLDER=/entrypoint.d

RUN apt-get update \
      && apt-get install -y apache2 \
      && rm -rf /var/lib/apt/lists/* \
      && apt-get clean

# Create app directory and copy distribution code from builder stage
WORKDIR ${UNITY_WWW_ROOT}
COPY --from=builder /usr/src/app/dist ./

# Configure apache2
COPY ./etc/apache2/sites-available/unity-ui.conf /etc/apache2/sites-available/
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN a2dissite 000-default.conf
RUN a2ensite unity-ui.conf

# Copy and set up files needed for container startup
COPY ./entrypoint.d/* ${ENTRYPOINT_FOLDER}/
RUN chmod 777 -R ${ENTRYPOINT_FOLDER}/* && chmod +x -R ${ENTRYPOINT_FOLDER}/*

EXPOSE 80

# Default process to run on container startup
ENTRYPOINT ["/entrypoint.d/docker-entrypoint.sh"]

# Default options to pass to apache when starting container in docker-entrypoint.sh
CMD ["-k", "start"]