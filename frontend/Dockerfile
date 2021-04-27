FROM node:alpine
WORKDIR /usr/src/app/
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /usr/src/app/
RUN npm ci
COPY . ./

EXPOSE 3000
CMD ["npm", "start"]
