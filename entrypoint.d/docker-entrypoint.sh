#!/usr/bin/env bash
#set -x; : "$0" "$@"  # Use for debugging

# Inject Environment Variables for React App
source ${ENTRYPOINT_FOLDER}/env.sh

rm -f /var/run/apache2/apache2.pid

# Run the main container process (from the Dockerfile CMD)
exec /usr/sbin/apachectl -D FOREGROUND "$@"