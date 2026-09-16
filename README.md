# Task Planner

A lightweight task planning application built with **NestJS**, **MongoDB**, and **Vue.js**.

The application is designed for a single user who wants to quickly enter tasks, mark them as completed, and access the
same task list across devices.

## Features

- Simple authentication using the secret question:
    - **Question:** `When do you want it?`
    - **Answer:** `NOW!`
- JWT-based authentication
- Add tasks quickly using the **Enter** key
- Automatically returns focus to the task input after adding a task
- Mark tasks as completed using a checkbox
- Completed tasks remain visible
- Displays task progress (`X out of Y tasks completed`)
- Optimistic checkbox updates for responsive interaction
- Responsive layout for desktop and mobile
- Tasks are persisted in MongoDB and are not tied to a specific browser or device
- Password visibility toggle on the login screen

## Prerequisites

Before running the application, make sure you have:

- Node.js 22.22.3 or later
- npm
- Access to a MongoDB database

MongoDB Atlas or another compatible MongoDB instance can be used.

Check your Node.js version:

```bash
node -v
```

If the installed version is lower than `22.22.3`, install a newer version of Node.js before continuing.

If you use NVM:

```bash
nvm install --lts
nvm use --lts
```

Verify the version:

```bash
node -v
```

## Quick Start

### 1. Install dependencies

From the project root:

```bash
npm install
```

From the project root:

```bash
npm run setup
```

### 2. Configure the environment (Optional)

Environment files are generally not committed to source control. However, for this coding challenge, the environment variables are already configured to simplify the installation process, so this step can be skipped.

If you want to use your own MongoDB URI and JWT secret, update `backend/.env` using `backend/.env.template` as a reference:

```env
MONGODB_URI=your_mongodb_connection_string
SECRET_ANSWER=NOW!
JWT_SECRET=your_random_jwt_secret
PORT=3000
```

### 3. Start the application

From the project root, run:

```bash
npm run start
```
This starts both the NestJS backend and Vue frontend (logs will be intertwined in single terminal). The application will automatically open in your browser.

#### Run separately (Alternative)

For separate backend and frontend logs, open two terminals from the project root.

**Terminal 1 — Backend**

```bash
npm run start:backend
```

**Terminal 2 — Frontend**

```bash
npm run start:frontend
```

## Environment Variables

| Variable        | Purpose                             |
|-----------------|-------------------------------------|
| `MONGODB_URI`   | MongoDB connection string           |
| `SECRET_ANSWER` | Answer required for authentication  |
| `JWT_SECRET`    | Secret used to sign and verify JWTs |
| `PORT`          | Backend server port                 |

