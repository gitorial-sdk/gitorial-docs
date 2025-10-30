# Docker Deployment Guide

This guide will help you containerize and test your Gitorial documentation site locally before deploying to production.

## Quick Start

### 1. Test Locally with Docker

Run the automated test script:

```bash
./scripts/test-docker.sh
```

This script will:
- Build the Docker image
- Start a container on port 3001
- Test all endpoints
- Keep the container running for manual testing

### 2. Manual Docker Commands

If you prefer to run commands manually:

```bash
# Build the image
docker build -t gitorial-docs .

# Run the container
docker run -d --name gitorial-docs -p 3000:8080 gitorial-docs

# View logs
docker logs gitorial-docs

# Stop and remove
docker stop gitorial-docs
docker rm gitorial-docs
```

### 3. Using Docker Compose

For easier management:

```bash
# Start production container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Start development container with hot reload
docker-compose --profile dev up
```

## What's Included

### Files Created:
- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development container with hot reload
- `docker-compose.yml` - Container orchestration
- `nginx.conf` - Optimized nginx configuration
- `.dockerignore` - Excludes unnecessary files
- `scripts/test-docker.sh` - Automated testing script

### Key Features:
- **Multi-stage build** - Optimized image size
- **Non-root user** - Security best practices
- **Health checks** - Container monitoring
- **Proper caching** - Static assets cached for 1 year
- **Client-side routing** - Handles Astro's routing
- **Security headers** - Production-ready security
- **Gzip compression** - Optimized performance

## Testing Checklist

Before deploying to production, verify:

- [ ] Main page loads at `http://localhost:3000`
- [ ] Documentation pages are accessible
- [ ] Images load correctly
- [ ] Navigation works (no nginx welcome page)
- [ ] Static assets are cached properly
- [ ] 404 pages work correctly

## Deployment to Coolify

Once local testing passes:

1. **Push to Repository**:
   ```bash
   git add .
   git commit -m "Add Docker containerization"
   git push
   ```

2. **Configure Coolify**:
   - Set build pack to **"Docker"**
   - Set port to **8080**
   - Point to your repository
   - Deploy!

3. **Environment Variables** (if needed):
   - `NODE_ENV=production`

## Troubleshooting

### Container won't start:
```bash
docker logs gitorial-docs
```

### Build fails:
```bash
docker build --no-cache -t gitorial-docs .
```

### Port conflicts:
Change the port mapping:
```bash
docker run -p 3001:8080 gitorial-docs
```

### Permission issues:
The container runs as non-root user for security. If you encounter permission issues, check the Dockerfile's user configuration.

## Development Workflow

1. **Local Development**:
   ```bash
   pnpm run dev
   ```

2. **Test with Docker**:
   ```bash
   ./scripts/test-docker.sh
   ```

3. **Deploy to Coolify**:
   - Push changes
   - Coolify auto-deploys

This ensures what works locally will work in production! 🐳
