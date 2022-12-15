FROM ubuntu:latest

RUN apt update
RUN apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y openjdk-11-jre
RUN npm install -g firebase-tools

COPY firebase.json /root/firebase.json

RUN firebase setup:emulators:firestore

ENV GCLOUD_PROJECT=tulip-local-dev

EXPOSE 4080
EXPOSE 4085
EXPOSE 4000

WORKDIR /root

CMD ["firebase","emulators:start","--project","tulip-local-dev"]