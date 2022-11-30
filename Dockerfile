FROM node:16.16.0-alpine
WORKDIR /source
USER root
COPY --chown=root:root . .
RUN yarn
RUN yarn build
CMD ["yarn", "start:prod"]