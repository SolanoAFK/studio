# Dockerfile

# 1. Builder Stage: Install dependencies and build the project
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies using 'npm ci' for faster, more reliable builds
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the source code and build the application
COPY . .
# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 2. Runner Stage: Create the final, lightweight production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1
# Dokploy will set the PORT, but we set a default
ENV PORT=3002

# Create a non-root user for better security
RUN addgroup -S -g 1001 nodejs
RUN adduser -S -u 1001 nextjs

# Copy the optimized standalone output from the builder stage.
# This single command includes the server, node_modules, and static assets.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# The application will run as the non-root user
USER nextjs

EXPOSE 3002

# Start the application
CMD ["node", "server.js"]
