<p align="center">
  <img title="logo" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/a21522b7-efc9-4acc-b5ee-c4eb17d0c507" height="200px">
</p>

# Introduction
**ft_transcendence** is the final cursus project that demonstrates the ability to transition to unfamiliar programming languages and frameworks based on current knowledge.

This is a [1337 coding school](https://1337.ma/en/) project that aims to develop an online and real-time Ping-Pong game.
It utilizes [Nest.js](https://nestjs.com/) as the backend framework, [Next.js](https://nextjs.org/) with [React.js](https://react.dev/) for the frontend, and brings them together using [Docker Compose](https://docs.docker.com/compose/).

:warning: This educational project is not intended for production use.

# Features

- Real-time Ping-Pong games
- Different game map themes

<img title="classic themed playground" width="32%" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/3151d3bb-d9f4-4b46-b2bf-ac90ea1ae43f">
<img title="space themed playground" width="32%" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/8c7fa8f4-9670-45f5-8c13-96ea95164a25">
<img title="jungle themed playground" width="32%" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/f09a49e4-758b-4f75-8436-193efb382958">
<img title="sahara themed playground" width="32%" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/e5a4c082-35a4-4735-8263-7a6def42fdb4">
<img title="ice themed playground" width="32%" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/e067a455-5689-4518-a237-696200416b2c">
<img title="beach themed playground" width="32%" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/ab71541d-71db-435b-b905-fd1ffa33b500">

<br />
<br />

- User friendly Interface
- Ability to add others as friends

<img title="user's home screen" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/38ab3c0c-8563-4242-adc3-191fe7563e5d">

<br />
<br />

- OAuth login via google and 42 intranet

<img title="login screen" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/e647cd16-8fca-44cc-b9d4-9fa719e8d638">

<br />
<br />

- 2FA account protection

<img title="2FA settings" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/71f03632-416c-4d3a-bb80-57d7bc0a246f">

<br />
<br />

- Direct messaging between users
- Ability to create public, private or password-protected chat groups

<img title="chat screen" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/72c9f395-dc84-476b-91bf-884d4d10c5d1">

<br />
<br />

- A Leaderboard to track player rankings

<img title="leaderboard screen" src="https://github.com/recursive-beast/ft_transcendence/assets/41545690/1ab315cd-ba43-4f40-a319-45227e76d0da">

<br />
<br />

# Technologies Used

The website was built using the following technologies:

- Frontend:
  - [Next.js](https://nextjs.org/)
  - [React.js](https://react.dev/)
  - [TailwindCss](https://tailwindcss.com/)
  - [Socket.io](https://socket.io/)
  - [Typescript](https://www.typescriptlang.org/)

- Backend:
  - [Nest.js](https://nestjs.com/)
  - [Socket.io](https://socket.io/)
  - [Prisma](https://www.prisma.io/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Docker Compose](https://docs.docker.com/compose/)

# Usage

### Prerequisites

- [docker & docker compose](https://docs.docker.com/get-docker/)

### Setup

1) clone the repo and go into the folder:

```
git clone git@github.com:recursive-beast/ft_transcendence.git
cd ft_transcendence
```

2) create `.env` files for the backend/frontend from templates:

```
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3) fill `backend/.env` and `frontend/.env` with the necessary secrets.

### Running the application

Once you have set up the environment variables, you can proceed to run the application using Docker Compose:

```
docker compose up --build -d
```

This will launch both the frontend and backend services, including the database, in separate Docker containers.

Wait for the containers to be up and running, then you can access the application through your web browser. The address is http://localhost:3000.

### Makefile

To simplify the management of the application, the following Makefile commands have been provided:

| **Command**&nbsp;&nbsp;&nbsp;&nbsp; | **Description** |
|-------------|-----------------|
| `make up` | Starts the application in detached mode, building the Docker containers. |
| `make down` | Stops and removes all Docker containers related to the application. |
| `make logs` | Displays the logs for a specific service. Specify the `SERVICE` parameter to view logs for a particular service. (e.g., `make logs SERVICE=frontend`) |
| `make clean` | This command will remove all containers, images, volumes, and networks related to Docker. <br />**⚠️ Exercise caution, as this action cannot be undone.** |
| `make db` | `(dev)` Starts only the PostgreSQL database in detached mode. |
| `make setup` | `(dev)` Sets up the application by starting the PostgreSQL database, installing frontend and backend dependencies, and applying database migrations. |

# Acknowledgments

Special thanks to [1337 coding school](https://1337.ma/en/) for providing the opportunity to work on this project and explore various technologies.
