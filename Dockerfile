FROM node:18-alpine

WORKDIR /app

COPY package.json .

# Install application dependencies
RUN npm install --production

RUN npm install bcrypt

# Install PM2 globally
RUN npm install -g pm2

# Bundle app source
COPY . .

# Expose the port that your Nest.js application will run on
EXPOSE 3000

# In development mode
# CMD ["npm", "run", "start:dev"]

# Start the application using PM2
# CMD ["pm2-runtime", "start", "pm2.config.js"]
CMD ["pm2-runtime", "dist/src/main.js"]

# docker build -t your-app-name .
# docker run -d -p 3000:8080 your-app-name
# curl http://localhost:3000