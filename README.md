# CodeQuest

CodeQuest is a gamified web learning system for programming education.

## Project Structure

- `frontend/` - React and Vite frontend application
- `back end/` - Node.js and Express backend application

## Running the Frontend

Run `npm i` inside `frontend/` to install dependencies.

Run `npm run dev` inside `frontend/` to start the development server.

## Running the Backend

Run `npm i` inside `back end/` to install dependencies.

Run `npm run start` inside `back end/` to start the backend server.

## Deployment

This repo includes a Render Blueprint in `render.yaml` for deploying:

- `codequest-api` as the Express backend from `back end/`
- `codequest` as the Vite static frontend from `frontend/`

Create a Render Blueprint from the GitHub repository and use the `main` branch. During setup, provide these backend secret values when prompted:

- `MONGODB_URI`
- `OPENROUTER_API_KEY`

Render generates `JWT_SECRET` automatically. The frontend is configured with `VITE_API_URL=https://codequest-api.onrender.com`.

Before deploying, verify the app locally:

```sh
cd frontend
npm run build
cd ..
node --test Testing/tests/*.test.mjs
```
