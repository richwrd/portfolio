# =============================================================================
# Stage 1 — Dependências
# =============================================================================
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else npm install --legacy-peer-deps; \
  fi

# =============================================================================
# Stage 2 — Build
# =============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_SOCIAL_GITHUB
ARG NEXT_PUBLIC_SOCIAL_LINKEDIN
ARG NEXT_PUBLIC_SOCIAL_DEVTO

ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_SOCIAL_GITHUB=$NEXT_PUBLIC_SOCIAL_GITHUB
ENV NEXT_PUBLIC_SOCIAL_LINKEDIN=$NEXT_PUBLIC_SOCIAL_LINKEDIN
ENV NEXT_PUBLIC_SOCIAL_DEVTO=$NEXT_PUBLIC_SOCIAL_DEVTO

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN \
  if [ -f package-lock.json ]; then npm run build; \
  elif [ -f yarn.lock ]; then yarn build; \
  else npm run build; \
  fi

# =============================================================================
# Stage 3 — Runner (imagem final mínima)
# =============================================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
  adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
