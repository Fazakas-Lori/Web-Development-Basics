import { generateText } from "./module1";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello, Web Dev 2!");
  let h1 = document.createElement("h1");
  h1.innerHTML = generateText("Somenewtext");
  document.body.appendChild(h1);
});
