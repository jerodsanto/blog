#!/bin/bash
set -e

cd ~/src/jerodsanto/net

echo "Building site with Hugo..."
hugo --quiet

echo "Deploying to dh:~/jerodsanto.net..."
rsync -az public/ dh:~/jerodsanto.net/

echo "Deployment complete!"
