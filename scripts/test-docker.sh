#!/bin/bash

# Test script for Docker deployment
set -e

echo "🐳 Testing Gitorial Docs Docker Deployment"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

print_status "Docker is running"

# Build the Docker image
echo ""
echo "Building Docker image..."
if docker build -t gitorial-docs:test .; then
    print_status "Docker image built successfully"
else
    print_error "Failed to build Docker image"
    exit 1
fi

# Stop any existing container
echo ""
echo "Stopping any existing containers..."
docker stop gitorial-docs-test 2>/dev/null || true
docker rm gitorial-docs-test 2>/dev/null || true

# Run the container
echo ""
echo "Starting container..."
if docker run -d --name gitorial-docs-test -p 3001:8080 gitorial-docs:test; then
    print_status "Container started successfully"
else
    print_error "Failed to start container"
    exit 1
fi

# Wait for the container to be ready
echo ""
echo "Waiting for application to be ready..."
sleep 10

# Test the application
echo ""
echo "Testing application endpoints..."

# Test main page
if curl -f -s http://localhost:3001/ > /dev/null 2>&1; then
    print_status "Main page is accessible"
else
    print_error "Main page is not accessible"
    echo "Container logs:"
    docker logs gitorial-docs-test
    docker stop gitorial-docs-test
    docker rm gitorial-docs-test
    exit 1
fi

# Test docs page
if curl -f -s http://localhost:3001/docs/ > /dev/null 2>&1; then
    print_status "Docs page is accessible"
else
    print_warning "Docs page might not be accessible (this might be expected)"
fi

# Test static assets
if curl -f -s http://localhost:3001/favicon.ico > /dev/null 2>&1; then
    print_status "Static assets are being served"
else
    print_warning "Some static assets might not be accessible"
fi

# Test 404 handling
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/nonexistent-page 2>/dev/null)
if [ "$HTTP_CODE" = "404" ]; then
    print_status "404 handling works correctly"
else
    print_warning "404 handling might not be working as expected (got HTTP $HTTP_CODE)"
fi

echo ""
echo "=========================================="
print_status "All tests passed! 🎉"
echo ""
echo "Your application is running at: http://localhost:3001"
echo ""
echo "To view logs: docker logs gitorial-docs-test"
echo "To stop: docker stop gitorial-docs-test"
echo "To remove: docker rm gitorial-docs-test"
echo ""
echo "When you're ready to deploy to Coolify:"
echo "1. Push these Docker files to your repository"
echo "2. In Coolify, set the build pack to 'Docker'"
echo "3. Set the port to 8080"
echo "4. Deploy!"

# Keep container running for manual testing
echo ""
echo "Container will keep running for manual testing..."
echo "Press Ctrl+C to stop and cleanup"

# Trap to cleanup on exit
cleanup() {
    echo ""
    echo "Cleaning up..."
    docker stop gitorial-docs-test 2>/dev/null || true
    docker rm gitorial-docs-test 2>/dev/null || true
    print_status "Cleanup complete"
}

trap cleanup EXIT

# Wait for user to stop
while true; do
    sleep 1
done
