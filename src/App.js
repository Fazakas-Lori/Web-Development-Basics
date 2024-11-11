import { generateText } from "./module1.js";

const App = () => {
  return (
    <>
      <h1>{generateText("Hello, Web Dev2!")}</h1>
      <h1>{generateText("Hello, REACT!")}</h1>
    </>
  );
};

export { App };
