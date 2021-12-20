FROM docker.io/node:16-bullseye-slim
USER node

ARG APP=app
ARG HOME=/home/node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:$HOME/.npm-global/bin
ENV PORT=5000

#build
WORKDIR $HOME/$APP
COPY --chown=node:node . .
RUN npm install
RUN npm run build

#cleanup
RUN cp -a build $HOME
RUN ln -s $HOME/build/index.html $HOME/build/404.html
WORKDIR $HOME
USER root
RUN rm -rf $APP

#prepare
EXPOSE $PORT
RUN npm install -g http-server

#start
USER node
ENTRYPOINT ["http-server", "build"]
CMD ["-a", "0.0.0.0", "-p", $PORT]
