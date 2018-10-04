FROM node:8.9-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install 
RUN npm install react-scripts@1.1.5 -g
EXPOSE 3000
CMD ["npm", "start"]