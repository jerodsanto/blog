#!/bin/bash
set -e

cd ~/src/jerodsanto/net

echo "Building site with Hugo..."
hugo --quiet --cleanDestinationDir

echo "Pruning old styles.min.*.css (keeping last 3)..."
ls -t public/styles.min.*.css 2>/dev/null | tail -n +4 | xargs -r rm -v
ssh dh 'ls -t ~/jerodsanto.net/styles.min.*.css 2>/dev/null | tail -n +4 | xargs -r rm -v'

echo "Deploying to dh:~/jerodsanto.net..."
rsync -az public/ dh:~/jerodsanto.net/

echo "Deployment complete!"
