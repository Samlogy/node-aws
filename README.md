# FS App React + Node

## Stack:

- React, Node
- Nginx
- postgresql
- Docker, docker compose
- git, github

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
