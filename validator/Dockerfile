FROM amazon/aws-lambda-nodejs:16
COPY package*.json ./
RUN npm install

COPY . .

#WORKDIR /var/task/app

#RUN yum -y install tar gzip && yum -y clean all  && rm -rf /var/cache

ENV TMP_DIR=/tmp
CMD [ "./app/app.lambdaHandler" ]