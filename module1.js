import { hi } from "./module2.js";

export function onReady() {
  alert("Welcome to Web Development 1!");
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  });
  let node = document.querySelector("#MyId");
  node.addEventListener("click", (event) => {
    alert("You clicked the link!");
  });

  hi();
}
