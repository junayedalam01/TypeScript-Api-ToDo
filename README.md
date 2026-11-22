# Todo API

A REST API built with **Node.js, Express, TypeScript, and MongoDB (Mongoose)**. It provides full CRUD operations.

## Tech Stack

- Node.js
- Express
- TypeScript (run with `tsx`)
- MongoDB + Mongoose
- dotenv, morgan

## Project Structure

```
api/
├── src/
│   ├── index.ts              # starts the server
│   ├── app.ts                # express app, middleware, routes
│   ├── config/               # env + database connection
│   ├── routes/
│   │   └── todo.routes.ts
│   ├── controllers/
│   │   └── todo.controllers.ts
│   └── models/
│       └── todo.model.ts
├── .env
├── package.json
└── tsconfig.json
```

## Installation

```bash
git clone <your-repo-url>
cd api
npm install
```

Starting from scratch instead:

```bash
mkdir api && cd api
npm init -y
npm i express mongoose dotenv morgan
npm i -D typescript tsx @types/node @types/express @types/morgan
npx tsc --init
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/todo-db
```

> Never commit `.env`. Add it to `.gitignore`.

## Scripts

Add to `package.json`:

```json
"scripts": {
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

## Run

```bash
# development (auto-reload)
npm run dev

# production
npm run build
npm start
```

Server runs at `http://127.0.0.1:3000`.

## API Endpoints

Base URL: `http://127.0.0.1:3000/api/v1/todo`

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/api/v1/todo`      | Create a record    |
| GET    | `/api/v1/todo`      | Get all records    |
| GET    | `/api/v1/todo/:id`  | Get one by id      |
| PUT    | `/api/v1/todo/:id`  | Update by id       |
| PATCH  | `/api/v1/todo/:id`  | Partial update     |
| DELETE | `/api/v1/todo/:id`  | Delete by id       |

### Request Body (POST / PUT / PATCH)

```json
{
  "fullname": "John Doe",
  "username": "admin",
  "age": 21,
  "email": "admin@gmail.com"
}
```

For PATCH, send only the fields you want to change:

```json
{ "age": 22 }
```

### Example Requests

```bash
# Create
curl -X POST http://127.0.0.1:3000/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{"fullname":"John Doe","username":"admin","age":21,"email":"admin@gmail.com"}'

# Get all
curl http://127.0.0.1:3000/api/v1/todo

# Get one
curl http://127.0.0.1:3000/api/v1/todo/<id>

# Update
curl -X PATCH http://127.0.0.1:3000/api/v1/todo/<id> \
  -H "Content-Type: application/json" \
  -d '{"age":22}'

# Delete
curl -X DELETE http://127.0.0.1:3000/api/v1/todo/<id>
```

> On Windows PowerShell, use `curl.exe` and escape quotes: `-d "{\"age\":22}"`.

### Responses

| Status | Meaning                          |
| ------ | -------------------------------- |
| 200    | Success                          |
| 201    | Created                          |
| 400    | Invalid id or bad request body   |
| 404    | Record not found                 |
| 500    | Server error                     |

Success example:

```json
{
  "message": "todo found",
  "todo": {
    "_id": "665f1c2e8f1b2a3c4d5e6f70",
    "fullname": "John Doe",
    "username": "admin",
    "age": 21,
    "email": "admin@gmail.com"
  }
}
```

Error example:

```json
{ "error": "Todo not found" }
```

## Common Issues

| Error                                   | Cause                                          |
| --------------------------------------- | ---------------------------------------------- |
| `argument handler must be a function`   | Controller import/export mismatch              |
| `Converting circular structure to JSON` | Missing `await` on a Mongoose query            |
| `Cast to ObjectId failed`               | Invalid id, or `req.params` passed instead of `req.params.id` |
| `Cannot GET /...`                       | Wrong URL or route path                        |
