# Dockerfile

# 1. Builder stage
# Install dependencies, copy source, and build the application
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
# Use 'npm ci' for faster, more reliable installs in CI/CD environments
RUN npm ci

COPY . .
# Generate the production build with standalone output
RUN npm run build

# 2. Runner stage
# Create a minimal production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output from the builder stage
# This includes the server, dependencies, and static/public assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs

EXPOSE 3002
ENV PORT=3002

# The standalone output creates a server.js file to run the application
CMD ["node", "server.js"]
