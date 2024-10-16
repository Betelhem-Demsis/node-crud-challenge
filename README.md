## node-crud-challenge

## Simple CRUD API Solution
 

### solution-details:

1. The task uses express and nodejs with in-memory database
2. implemented error controller to handle  Requests to non-existing endpoints and Internal server errors .
3. API endpoints
    * **GET All Person** `/person` -- to get all person files
    * **GET a Person** `/person/${personId}` -- to get a person with corresponding `personId`
    * **POST** `/person` -- to create record about new person and store it in database
    * **PUT** `/person/${personId}` -- to update record about existing person
    * **DELETE** `/person/${personId}`-- to delete record about existing person from database
  
4.Folder Structure
   - `controllers/`
     - `ErrorController.js` -- Handles global errors
     - `PersonController.js` -- to implements person api endpoints
   - `db/`
     - `db.js`  -- In-memory database storage
   - `routes/`
     - `personRoute.js` -- Handles person routes
   - `utils/`
     - `AppError.js`  --  to generate custom error messages based on errors.
     - `catchAsync.js` -- Reduces try-catch boilerplate for cleaner code
   - `index.js`  -- Main file
   - run the server using `node index.js`
