FROM node:14.16.0-buster
USER node

ARG APP=app
ARG HOME=/home/node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:$HOME/.npm-global/bin

#build
RUN mkdir -p $HOME/$APP
WORKDIR $HOME/$APP
COPY --chown=node:node . .
RUN  npm install
RUN  npm run build

#cleanup
RUN  cp -a build $HOME
WORKDIR $HOME
USER root
RUN  rm -rf $APP

#prepare
EXPOSE 5000
RUN npm install -g serve

#start
USER node
ENTRYPOINT serve -s build


