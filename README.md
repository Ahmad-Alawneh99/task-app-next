This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

* Clone this repo and the [backend repo](https://github.com/Ahmad-Alawneh99/task-app-nest)
* Ensure that Docker is installed locally
* Pull Mongodb's docker image by running `docker pull mongodb/mongodb-community-server:latest`
* Prepare an image for this frontend repo by opening a terminal in the directory of the repo, and running the following command: `docker build -t task_app_frontend .`
* Do the same steps for the backend repo
* Run `docker-compose up`, this will run the database, the backend and the frontend applications (can be done in either the frontend or backend repo, as docker-compose file exists in both)
* Access the frontend application by going to `http://localhost:3000`

## Alternative way
To run the app without using Docker, do the following

* Follow the steps in the backend repo to run the backend server
* Ensure node20 is installed
* Run `npm i`
* Create a `.env` file and put the following value in it: `BACKEND_API=http://localhost:3030`
* Run the backend app
* Run `npm run dev`
* Access the frontend application by going to `http://localhost:3000`

## Pages
* `/`: Dashboard, requires authentication
* `/sign-up`: Sign up page
* `/sign-in`: Sign in page
* `/tasks`: Tasks page, requires authentication
* `/tasks/add`: Add tasks page, requires authentication
