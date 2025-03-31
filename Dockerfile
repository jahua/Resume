# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies with legacy peer deps flag
# Use npm ci for cleaner installs in CI/CD environments
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production with standalone output
# Ensure your next.config.js has `output: 'standalone'`
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV production
# Optionally set PORT environment variable (Next.js default is 3000)
# ENV PORT 3000 

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone build output from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 

# Copy the static assets from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy the public folder from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on (default 3000)
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"] 