# ============================================
# Dependencies: Bun
# ============================================
FROM oven/bun:1-alpine AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile


# ============================================
# Builder: Bun
# ============================================
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL

# API_URL is a server-side runtime env — not baked into the JS bundle.
# Set a placeholder so Next.js doesn't throw on missing env during build;
# the real value is injected at container start via docker-compose environment.
ENV API_URL=http://build-placeholder
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build


# ============================================
# Production: Node.js
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Set cache and route-cache permissions for node user
RUN mkdir -p .next/cache .next/server/route-cache && chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "server.js"]
