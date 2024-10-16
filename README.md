# node-crud-challenge

## Simple CRUD API Solution
 

## Details:

1. The task uses express and nodejs with in-memory database
2. implemented error controller to handle  Requests to non-existing endpoints amd Internal server errors .
3. created AppEror file to create different message based on error  
4. API endpoints
    * **GET All Person** `/person` -- to get all person files
    * **GET a Person** `/person/${personId}` -- to get a person with corresponding `personId`
    * **POST** `/person` -- to create record about new person and store it in database
    * **PUT** `/person/${personId}` -- to update record about existing person
    * **DELETE** `/person/${personId}`-- to delete record about existing person from database
  
5. Folder structure

├── controllers
│   ├── ErrorController.js - to handle global errors
│   └── PersonController.js - to implements person api endpoint
│
├── db
│   └── db.js - In-memory database storage
│
├── routes
│   └── personRoute.js - Handles person routes
│
├── utils
│   ├── AppError.js - Error handling utilities
│   └── catchAsync.js - Reduces try-catch boilerplate for cleaner code
│
└── index.js - Main file; run the server using `node index.js`
