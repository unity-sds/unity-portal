############################################################
############################################################
# Code Building Stage

FROM node:lts-hydrogen as builder

# Add git
RUN apt-get update

# Create app directory
WORKDIR /usr/src/app

# Copy source to workdir
COPY . .

# Install dependencies
RUN npm clean-install

# Build distribution
RUN npm run build-integration


############################################################
############################################################
# Build Image Stage

FROM ubuntu:18.04
LABEL version="0.0.1"

RUN apt-get update \
      && apt-get install -y apache2 \
      && rm -rf /var/lib/apt/lists/* \
      && apt-get clean

# Create app directory and copy distribution code from builder stage
WORKDIR /var/www/unity-ui
COPY --from=builder /usr/src/app/dist ./

# Configure apache2
COPY ./etc/apache2/sites-available/unity-ui.conf /etc/apache2/sites-available/
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN a2dissite 000-default.conf
RUN a2ensite unity-ui.conf

EXPOSE 80

# Default command to run container
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND", "-k", "start"]