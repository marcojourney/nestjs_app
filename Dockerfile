FROM node:20
# Set working directory
WORKDIR /

COPY package.json .

COPY .env.example /.env

# Install application dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Bundle app source
COPY . .

# Expose the port that your Nest.js application will run on
EXPOSE 3000

# Run migrations on container start

# ENTRYPOINT ["npm", "run", "migration:run"]

# In development mode
# CMD ["npm", "run", "start:dev"]

# Start the application using PM2
# CMD ["pm2-runtime", "start", "pm2.config.js"]
# CMD ["pm2-runtime", "server.js"]
CMD ["npm", "run", "start:dev"]
# CMD ["./docker_run_script.sh"]
# CMD npm run migration:run && npm run start:dev

# docker build -t your-app-name .
# docker run -d -p 3000:8080 your-app-name
# curl http://localhost:3000