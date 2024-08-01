# Created by Haroune Kechaoui on 01/08
# Note: Nextjs apps are better off hosted on a platform like vercel than dockerized,
# but this is for demonstration purposes only.
FROM node:18

# We set our project working directory to point into /src for context
WORKDIR /src/app
# Copy package.json and package-lock.json into our working directory and then run npm install
COPY package*.json ./
RUN npm install
# We copy the rest of our files into the current working directory
COPY . .
# We tell the container that this app will be running on port 3000 (it is a next app after all)
EXPOSE 3000
# We run the start command (set this to npm run start for prod building)
CMD npm run dev