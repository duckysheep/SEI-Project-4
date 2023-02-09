# Project 4

## Description

This project is a full stack application built with the FARM stack (`FastAPI + MongoDB` on the backend, `ReactJS` on the frontend).<br>
It is meant for users to host, register for, and track events.

<hr>

## Planning & Development Process

[Wireframe](https://miro.com/app/board/uXjVPzUh0aU=/) used to come up with an idea of how I wanted the app to look like.

<hr>

### Technical Used

- React
- FastAPI
- Node.js
- Mongodb
- Javascript
- HTML
- CSS
- Chakra UI
- Vite

<hr>

### Development

Server

- GET,POST,PATCH,PUT,DELETE endpoints

Client

- Navigation bar
- Routing
- Signup and login
- JWT authentication
- Protected routes
- Home page and logic
- Modals and logic

### Future Improvements

- App deployment
- Additional functionality on managing participants (grouping, manual additions)
- Automatic toggle after event date is over
- Recurring event option

<hr>

## Running Locally

Clone repo to your local machine. Following instructions are for Windows machines only.

### Set up python virtual environment

```bash
`python -m venv env`
```

### Install dependencies

In the base directory:

```bash
`cd backend`
`pip install -r requirements.txt`
```

### Activate virtual environment

```bash
env/Scripts/activate
```

### Running the backend

In the backend directory:

```bash
uvicorn app.app:app --reload
```

<hr>

## Frontend

### Install dependecies

In the base directory:

```bash
cd frontend

npm install
```

### Running frontend

```bash
npm run dev
```
