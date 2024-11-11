import { generateText } from "./module1.js";
import { Profile } from "./Profile.js";

const App = () => {
  return (
    <>
      <h1>{generateText("Hello, Web Dev2!")}</h1>
      <h1>{generateText("Hello, REACT!")}</h1>
      <Profile name={"Katherine Johnson"} size={{ width: 200, height: 200 }} />
    </>
  );
};

export { App };
