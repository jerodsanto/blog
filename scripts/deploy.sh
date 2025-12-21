#!/bin/bash
set -e

cd ~/src/jerodsanto/net

echo "Building site with Hugo..."
hugo --quiet

echo "Deploying to mydh:~/jerodsanto.net..."
rsync -az public/ mydh:~/jerodsanto.net/

echo "Deployment complete!"
