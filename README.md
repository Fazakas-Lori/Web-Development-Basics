# Web-Development-Basics

## CREATING A REST API FOR CALCULATIONS + IN-MEMORY DB / TASKS

0. Prerequisites: installed _POSTMAN_ app or _curl_ cmd line tool
1. Create 3 different api endpoints that will work on our calculations

   - `_GET_, api/calculation`: If we send a GET request here, we will get back a json object containing all the previous calculations

     ```
     app.get("/api/calculation", (req, res) => {
       console.log("GET /api/calculation");
       res.sendStatus(200);
     });
     ```

     - Notice: `res.sendStatus(200);` will send a _success_ signal back to the client

   - `POST, api/calculation`: When we press the _"="_ symbol on the calculator the result will be sent to the server

     ```
     app.post("/api/calculation", (req, res) => {
       console.log("POST /api/calculation");
       res.sendStatus(201);
     });
     ```

     - Notice: `res.sendStatus(201);` will send a _created_ signal back to the client

   - `DELETE, api/calculation/[id]`: If we send a DELETE request here, the specified calculation will be deleted

     ```
     app.delete("/api/calculation/:id", (req, res) => {
       console.log("DELETE /api/calculation/:id");
       res.sendStatus(204);
     });
     ```

     - Notice: `res.sendStatus(204);` will send a _did it, but I have nothing to say_ signal back to the client
     - Notice: _url param parsing_
     - Notice: `console.log`s on all api endpoints to help development and logging

   - **Try them out from Postman app**
     - Note: You will have to restart server after any editing - hot reload for server components is not enabled

2. Create an in-memory database

   - Create a module file called `src/backend/db.js`
   - It should export a function wich returns an object with some inner functions when called. Has an array where it stores numbers

     ```
     const { v4: uuidv4 } = require("uuid");

     const db = () => {
       let numObj = [];

       const getNums = () => {
         return numObj;
       };

       const createNum = (num) => {
         const newNum = { id: uuidv4(), num: num };
         numObj.push(newNum);
         console.log(`Creating num ${newNum.num} with id: ${newNum.id}`);
       };

       const findNum = (id) => {
         return numObj.find((numObj) => numObj.id === id);
       };

       const deleteNum = (id) => {
         numObj = numObj.filter((numObj) => numObj.id !== id);
         console.log(`Deleting num: ${id}`);
       };

       return { getNums, createNum, findNum, deleteNum };
     };

     module.exports = db;
     ```

     - Notice: Using `uuidv4` package for id-ing objects
     - Notice: _module.exports_ syntax
     - Notice: JS closures, `numObj`

   - Install _uuidv4_ package `npm install uuidv4`

3. Finish the api requests

   - Import and instantiate the db
     ```
     const dbInit = require("./db.js");
     const db = dbInit();
     ```
   - `GET, api/calculation`: Use the `db` objects interface send back all the numbers
     ```
     console.log("GET /api/calculation");
     const nums = db.getNums();
     res.json(nums, 200);
     ```
     - Notice: `res.json` We will be sending back the number in json format
   - `POST, api/calculation`: Use the `db` objects interface to store the new number

     ```
     console.log("POST /api/calculation");
     const num = req.body.num;
     db.createNum(num);
     res.sendStatus(201);
     ```

   - `DELETE, api/calculation/[id]`:

     ```
     console.log("DELETE /api/calculation/:id");
     const numId = req.params.id;
     if (db.findNum(numId) !== undefined) {
       db.deleteNum(numId);
       res.sendStatus(204);
     } else {
       jsonErr = { error: "Num not found in DB" };
       res.json(jsonErr, 404);
     }
     ```

     - Notice: `res.json(jsonErr, 404);` will send a generic _not found_ signal back to the client together with an error message

   - Try the app now from postman
     - Notice: We are getting all sorts of error related to json usage with the POST endpoint
     - Use express's json middleware: `app.use(express.json());`
     - Notice: Middleware syntax with _app.use_ in Express based Server Frameworks. But also in [_ASP.NET Core_](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-9.0)
     - Notice: [_Nodejs based API handlers(like NextJS)_](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) all get a request and response object representing the HTTP request and HTTP Response. But also in [_ASP.NET Core Minimal Api_](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-9.0#endpoint-defined-outside-of-programcs)

4. Debug the application from VSCode
   - _hands on_
5. Further challenges
   - Backend:
     - Rewrite the two file using ES6 module syntax ([_CommonJS vs ES Modules_](https://www.syncfusion.com/blogs/post/js-commonjs-vs-es-modules)) - hint: renaming files with .mjs extensions helps
     - Create a timed function that saves the db from time-to-time to a file
     - Load the calculations file when the server starts
     - _GET, api/calculation/[id]_: If we send a DELETE request here, supplying a correct id, we will get back a json object containing only the requested calculation
     - _DELETE, api/calculation_: If we send a DELETE request here, all calculations will be deleted from the db
     - _PUT, api/calculation_/[id]: If we send a PUT request here, supplying a correct id, the calculation will be updated in the db
   - Frontend:
     - Save all the calculation to a file (_OS api usage: fs, path_)
     - Create a frontend REACT component that can use all these APIs
   - Frontend + Backend:
     - Simulate that an enpoint is behind authorization by checking if the cliend has send a bearer token in the [**HTTP-Authorization Header**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
       - in the api endpoint
       - with middleware for all api endpoints
