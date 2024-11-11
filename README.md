# Web-Development-Basics

## State

- Javascript Module usage
- Restructured App

## Initial Problem

- Modules can only be used with the http protocol (source cannot be a file from disk, must be from a server)

## **JS Module-Based Development** / Tasks

1. Restructure App to a JS Module-Based development

   - create a `dist` folder under `root`
     - create an `index.html` here, copy contents of old html file here, or copy contents of `dist/index.html` from github
   - create a `src` folder under `root`
     - create an `module1.js` here, copy contents of `module1.js` from github
       - read and understand the code inside `module1.js`
       - Notice: 1 function is exported, generates some text
     - create an `index.js` here, copy content of `index.js` from github
       - read and understand the code inside `index.js`
       - Notice: Old script code from html was moved here
       - Notice: 1 function is imported from `module1.js`, named `generateText()`
     - delete old files (`webdev1.html`,`module1.js`,`module2.js`)

2. Run the app by opening the html in a browser

- Notice: Module error in Developer Tools / Console Panel

## New Features

- Dist folder contains distributables

## Ending Problems

- Module error loading still persists, there is no server component and/OR js is not bundled into a single file
