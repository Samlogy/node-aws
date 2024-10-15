# FS App React + Node

## Stack

- **front**: React, Nginx.
- **back**: Node, Express, Postgresql
- **testing**: jest, supertest
- **devops**: Docker, docker compose, github actions, aws
- **tools**: git, github

**front**

- `docker build -t react-app .`
- `docker run -p 4001:4001 react-app`

**back**

- `docker build -t node-app .`
- `docker run -p 4002:4002 node-app`

**full-stack**

- `docker compose up --build`

**check postgres db**

- `psql -h localhost -U user -d todos_db -p 5433`

**Getting started**

- dev:
  `npm run dev` => front + back
- prod:
  `docker compose up`

## Run tests

**unit / integration**

- unit tests: `npm run test:unit`
- integration tests: `npm run test:integration`
- coverage tests: `npm run test:coverage`

## Pipeline

- **CI**

  - **build** (stage)

    - install dependencies && build react app (step),
    - run unit tests (step),
    - build docker image (step),

  - **test** (stage)

    - run integration tests (step),

  - **release** (stage)
    - push docker image to docker hub (step),

- **CD**
  - pull docker image from docker hub,
  - deploy docker image => flyio

**fly io**

- install fly.io
- create an account on flyio
- `flyctl auth login`
- `flyctl launch`
- add credit card
- add token => `fly tokens create deploy -x 999999h`
