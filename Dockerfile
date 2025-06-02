# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Generate Prisma client and build the app
RUN npx prisma generate
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine

WORKDIR /app

# Copy only the built files and node_modules
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
