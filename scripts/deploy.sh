#!/bin/bash
set -e

cd ~/src/jerodsanto/net

echo "Building site with Hugo..."
hugo --quiet

echo "Deploying to dh:~/jerodsanto.net..."
rsync -az public/ dh:~/jerodsanto.net/

echo "Pruning old styles.min.*.css from server (keeping last 3)..."
ssh dh 'ls -t ~/jerodsanto.net/styles.min.*.css 2>/dev/null | tail -n +4 | xargs -r rm -v'

echo "Deployment complete!"
