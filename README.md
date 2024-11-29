# Web-Development-Basics

## REACT COMPONENT(S) THAT ACCESS POST AND GET APIs OF SERVER / TASKS

0. Correct the REST Api endpoints
   - In `src/backend/server.js`, api endpoints should use `calculation` in plural form, `calculations`, thus adhering to the REST API resource naming convention
   - Try out the endpoints with POSTMAN, and also check server logs
1. Calculator should send resulting numbers to server
   - Modify `src/frontend/Calculator.js` to send result to server on clicking the "=" symbol
     - in `handleClick` modify "=" handling part to the following
     ```
      else if (symbol === "=") {
        let newNum1 = calculateOperationResult();
        setDisplayText(newNum1);
        reset();
        sendToServer(newNum1);
        setNumber1(newNum1);
      }
     ```
     - Noticce: `sendToServer(newNum1);` call
   - Write the `sendToServer` function, above `sendToServer`
     ```
       const sendToServer = async (num) => {
       console.log(`Sending number ${num} to server`);
       const res = await fetch("/api/calculations", {
         method: "POST",
         headers: { Accept: "application/json", "Content-Type": "application/json" },
         body: JSON.stringify({ num: new Number(num) }),
       });
       console.log(`Server response: ${res.status} and message ${res.statusText}`);
     };
     ```
     - Notice: Setting the request `Method` to `POST`
     - Notice: Setting the request `body` to a json string
     - Notice: Setting the `Accept` and `Content-Type` Req. Headers
   - Try out the new codes by running the server and frontend with `npm run dev`, then doing some calculations and using POSTMAN to GET the calculations
     - Notice: Server should create a log after pressing the "=" symbol, conferming a sucessful POST request
2. Create a component that can GET the calculated numbers so far from the server

   - Create a new file in `src/frontend/` called `ServerContent.js` with the following content

     ```
     import { useState } from "react";

     const ServerContent = () => {
         const [numberList, setNumberList] = useState([
           { num: 0, id: 0 },
           { num: 2, id: 1 },
         ]);

         const numberItems = numberList.map((numObj) => <li key={numObj.id}>{numObj.num}</li>);

         return (
           <>
             <div>
               <h3>
                 <div>
                   <span>Server Content - Numbers Calculated So Far</span>
                 </div>
               </h3>
               <div className="numbers-list">
                 <ul>{numberItems}</ul>
               </div>
             </div>
           </>
         );
     };

     export { ServerContent };
     ```

     - Notice: It doesnt do very much right now, just outputs a few hard coded numbers
     - Notice: JSX list rendering syntax in the unordered list tag

   - Use the new component inside `src/frontend/App.js`
     - `import { ServerContent } from "./ServerContent.js"`;
     - `<ServerContent />`
   - Lets stylize the component a bit, by adding
     - `className="numbers"` to the main div
     - `className="flex"` to the span container div
     - `className="numbers-list"` to the list container div
   - Write the two necessary css classes in `styles.css`

     ```
     .numbers {
       @apply mx-auto my-2 p-5 max-w-sm bg-white rounded-md shadow-lg text-sm;
     }

     .numbers-list {
       @apply mx-auto my-2 p-5 bg-neutral-100 shadow-md rounded-md;
     }
     ```

     - Notice: On a file save, if your hot reload is working fine, the page should refresh automatically

   - Show server data by fetching the data from the server when the component initializes

     - Create an async `fetchData` function inside the `ServerContent` component

     ```
     async function fetchData() {
       console.log("Fetching data from server");
       // Start the spinner
       spinnerRef.current.classList.add("animate-spin");

       const numListReq = await fetch("/api/calculations");
       const numListJson = await numListReq.json();
       let numList = [];
       numListJson.forEach((num) => {
         numList.push(num);
       });

       setNumberList(numList);

       // Stop the spinner
       spinnerRef.current.classList.remove("animate-spin");
       console.log("Fetched data from server");
     }
     ```

   - Call the function when the component initializes

     ```
     useEffect(() => {
       fetchData();
     }, []);
     ```

     - Notice: `[]` param, means the useEffect hook only gets called once (VS on every state change of the component)
     - Note: Dont forget to import the useEffect hook from react `import { useState, useEffect } from "react";`
     - Notice: On a file save, if your hot reload is working fine, the page should refresh automatically and the component should show the correct server data!

- Add an refresh icon that, when pressed, will query new server data
  - start by getting the image from the git repository. Its committed under `src/frontend/refresh_icon.svg`
  - import the image with `import refreshImg from "./refresh_icon.svg";`
  - add an _img_ tag above the span in `ServerContent.js` that references the new refresh icon, and, on click, calls the `fetchData` function: `<img ref={spinnerRef} src={refreshImg} className="my-auto mx-2 cursor-pointer w-4 h-4" onClick={fetchData}></img>`
    - Notice: On file save, we will get a webpack error stating it cannot bundle this file for the server. Correct this by adding a webpack module rule to handle assets
    ```
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      ],
    },
    ```
    - Dont forget to install the file-loader with `npm install -D file-loader` the restart the server and see/try the new icon in action
- Finally, lets animate the spinner with CSS trickery
  - Reference the img with a REACT ref object
    - import useRef `import { useEffect, useState, useRef } from "react";`
    - `let spinnerRef = useRef(null);` at the top of the component
    - `<img ref={spinnerRef} src={refreshImg} className="my-auto mx-2 cursor-pointer w-4 h-4" onClick={fetchData}></img>`
  - When fetching the data from the server, add the [`animate-spin`](https://tailwindcss.com/docs/animation) tailwind class to the image. So in `fetchData` add the following lines before sending the request
  ```
  ...
  // Start the spinner
  spinnerRef.current.classList.add("animate-spin");
  ...
  ```
  - Add the following lines after the request finishes
  ```
  ...
  // Stop the spinner
  spinnerRef.current.classList.remove("animate-spin");
  ```
  - Try it out. In dev mode, the response is so fast we cant really see the animation. So if we are in dev mode, modify `server.js`'s GET request to hang a little before sending the reponse
  ```
  app.get("/api/calculations", (req, res) => {
    console.log("GET /api/calculations");
    const nums = db.getNums();
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        res.json(nums, 200);
      }, 1000);
    } else {
      res.json(nums, 200);
    }
  });
  ```
  - Restart the server and check out your cool new animation!
