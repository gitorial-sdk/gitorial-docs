#!/bin/bash

# Quick rebuild and test script for Sharp fixes
set -e

echo "🔧 Rebuilding Docker image with Sharp fixes..."
echo "============================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Clean up any existing containers
echo "Cleaning up existing containers..."
docker stop gitorial-docs-test 2>/dev/null || true
docker rm gitorial-docs-test 2>/dev/null || true

# Remove old image to force rebuild
echo "Removing old image..."
docker rmi gitorial-docs:test 2>/dev/null || true

# Rebuild with no cache to ensure Sharp is properly installed
echo "Rebuilding Docker image (this may take a few minutes)..."
if docker build --no-cache -t gitorial-docs:test .; then
    print_status "Docker image rebuilt successfully with Sharp support"
else
    echo "❌ Failed to rebuild Docker image"
    exit 1
fi

# Test the new image
echo ""
echo "Testing the rebuilt image..."
if docker run -d --name gitorial-docs-test -p 3001:8080 gitorial-docs:test; then
    print_status "Container started successfully"
else
    echo "❌ Failed to start container"
    exit 1
fi

# Wait for container to be ready
echo "Waiting for application to start..."
sleep 15

# Quick test
echo "Testing main page..."
if curl -f -s http://localhost:3001/ > /dev/null 2>&1; then
    print_status "✅ Application is working! Sharp issue should be resolved."
    echo ""
    echo "🎉 Success! Your application is now running at: http://localhost:3001"
    echo ""
    echo "You can now:"
    echo "1. Test all your routes manually"
    echo "2. Check that images are loading properly"
    echo "3. Deploy to Coolify with confidence!"
    echo ""
    echo "To stop: docker stop gitorial-docs-test && docker rm gitorial-docs-test"
else
    echo "❌ Application is not responding. Checking logs..."
    docker logs gitorial-docs-test
    docker stop gitorial-docs-test
    docker rm gitorial-docs-test
    exit 1
fi
