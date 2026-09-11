FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm install
RUN npm --prefix client install
RUN npm --prefix server install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
ENV HOST=0.0.0.0
COPY --from=builder /app /app
EXPOSE 5000
CMD [" npm\, \start\]
