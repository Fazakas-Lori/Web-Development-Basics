# Web-Development-Basics

## REACT - The Very Basics

1. [Functional Components](https://react.dev/reference/react/components) - [Profile Component](https://react.dev/learn/your-first-component#defining-a-component)

   - Under `/src` create a new file called Profile.js, and add the following contents to it

   ```
   const Profile = () => {
   return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
   )
   }

   export { Profile };
   ```

   - To use the new component, modify `App.js` to render it

     - add `import { Profile } from "./Profile.js";` somewhere at the top of the file
     - add `<Profile />` in your return clause

   - To customize a component use [props](https://react.dev/learn/passing-props-to-a-component)
     - modify `Profile.js`, by adding `props` (parameters) to it
       - modify component function declaration to include props object: `const Profile = ({ name, size }) => {...}`
       - modify return value so it can return a multitude of nodes: `return (<>...</>);`
       - add a name element to the returned value, which uses the name part of the props object: `<h2>{name}</h2>`
       - modify img element so it uses the size part of the props object: `<img src="https://i.imgur.com/MK3eW3Am.jpg" alt={name} width={size.width} height={size.height} />`
     - modify `App.js` to use the new `Profile` component, by supplying props to it `<Profile name={"Katherine Johnson"} size={{ width: 200, height: 200 }} />`

2. [State Management](https://react.dev/learn/managing-state) - [Counter Component](https://react.dev/reference/react-dom/client/createRoot#usage)
   - Modify `Profile.js` so it counts and shows the number of time the user clicks on the image
     - create a variable pair inside the component that will hold the click count: `const [clickCount, setClickCount] = useState(0);`
     - `useState` is a hook (js function) in react used for component state management, so you need to import it: `import { useState } from "react";`
     - add a paragraph REACT element unde the image that will display the number of clicks: `<p>Click count: {clickCount}</p>`
     - inside the component, above the `return` statement, create a function that will handle the image clicks
     ```
     const handleClick = () => {
       setClickCount(clickCount + 1);
     };
     ```
     - bring it all together by adding a REACT event to the `img` REACT element `<img onClick={handleClick} src="https://i.imgur.com/MK3eW3Am.jpg" alt={name} width={size.width} height={size.height} />`

- Try it out in the browser

3. [Hooks](https://react.dev/reference/react/hooks) - Readding our old Geolocation code, so it executes when the component loads

   - On Hooks

     - hooks are functions used to _hook into_ component lifecycle events
     - syntax of `const [clickCount, setClickCount] = useState(0);` may be a bit weird, it is [Destructing Assignment syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

   - Get the old geolocation code, it was something like the following

   ```
   document.addEventListener("DOMContentLoaded", () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    });
   });
   ```

   - Add an effect, specifically the useEffect hook, to the `Profile.js` Component, immediately as the firts line of the function: `useEffect(() => {}, []);`
     - Notice the `useEffect` function requires 2 parameters: 1st -function to execute, 2nd - dependency array with reactive values which trigger rerun of 1st param function. An empty array means the function run only once
   - Move the old codes main logic inside the `useEffect`

   ```
     useEffect(() => {
       navigator.geolocation.getCurrentPosition((position) => {
         console.log(position.coords.latitude);
         console.log(position.coords.longitude);
       });
     }, []);
   ```

   - Check that it works in the browser

   <br/>
   <br/>
   <br/>

# 🥳🎉 CONGRATULATIONS! YOU ARE NOW A FRONT-END DEVELOPER! 🥳🎉
