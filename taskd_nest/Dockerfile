# Created by Haroune Kechaoui on 01/08
FROM node:18

# We set our project working directory to point into /src for context
WORKDIR /src
# Copy package.json and package-lock.json into our working directory and then run npm install
COPY package*.json .
RUN npm install
# We copy the rest of our files into the current working directory
COPY . .
# We tell the container that this app will be running on port 8000
EXPOSE 8000
# We send the start command (set this to npm run start for prod building)
CMD npm run start:dev
