FROM node:16.16.0-alpine AS DEV
WORKDIR /source
USER root
COPY --chown=root:root . .
RUN yarn

FROM DEV AS PROD
RUN yarn build
CMD ["yarn", "start:prod"]