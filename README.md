
## Project Overview
This is a simple REST API buit with Express.js that handles users, posts, and comments.

It includes middleware validation and error handling and more.

Notes:
It’s not always clear which routes require full CRUD functionality. For example, adding GET /users/:id/posts made sense for retrieving a user’s posts, but it wasn’t obvious whether PATCH or DELETE should be allowed. Implementing those could unintentionally permit modification or deletion of someone else’s posts. This project made me reflect more deeply on the purpose and intention behind thoughtful route design.


# API Documentation
## Quick Start

- **Get all comments**  
 `GET http://localhost:3000/api/comments`


- **Get all comments or filter by ?postId=**  
`GET http://localhost:3000/api/comments?postId=1`

- **Get a single comment by ID**  
`GET http://localhost:3000/api/comments/:id`  
*(Replace `:id` with the actual comment ID)*

- **Create a new comment**  
  To create a new comment, send a `POST` request to:  
  `POST http://localhost:3000/api/comments`

  The form for submitting a comment can be found at:  
  `POST http://localhost:3000/`


## API Endpoints

### Base URL
`http://localhost:3000/api`

---

### Users

- **GET** `/users`  
  - Get all users
  
- **GET** `/users/:id`  
  - Get a specific user by ID
  
- **POST** `/users`  
  - Create a new user
  
- **PATCH** `/users/:id`  
  - Update a user by ID
  
- **DELETE** `/users/:id`  
  - Delete a user by ID
  
- **GET** `/users/:id/posts`  
  - Get posts by a specific user

---

### Posts

- **GET** `/posts`  
  - Get all posts or filter by `?userId=`
  
- **GET** `/posts/:id`  
  - Get a specific post by ID
  
- **POST** `/posts`  
  - Create a new post
  
- **PATCH** `/posts/:id`  
  - Update a post by ID
  
- **DELETE** `/posts/:id`  
  - Delete a post by ID

---

### Comments

- **GET** `/comments`  
  Get all comments or filter by `?postId=`

- **GET** `/comments/:id`  
  Get a specific comment by ID

- **POST** `/comments`  
  Create a new comment

- **PATCH** `/comments/:id`  
  Update a comment by ID

- **DELETE** `/comments/:id`  
  Delete a comment by ID

