FROM oven/bun:alpine AS base
WORKDIR /app

# Install dependencies (including dev) in a separate stage so the builder
# can run the full build. Dev deps will not be carried into the final image.
FROM base AS installer
COPY package.json bun.lock ./
ENV NODE_ENV=development
RUN bun install --frozen-lockfile

# Build the Next.js application
FROM base AS builder
COPY --from=installer /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Production runtime image: install only production deps here to keep final
# image small. We avoid copying the full `node_modules` tree from the
# installer/builder stages so dev deps are excluded.
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Use Next's standalone output to copy only runtime files
# (.next/standalone contains server.js and a minimal package.json)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Install only production dependencies declared by the standalone package
RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && [ -f package.json ] && npm ci --production --silent || true \
    && apk del .gyp \
    && rm -rf /tmp/* /var/cache/apk/*

EXPOSE 3000
CMD ["node", "server.js"]