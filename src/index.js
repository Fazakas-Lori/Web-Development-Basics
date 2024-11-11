import { createRoot } from "react-dom/client";
import { App } from "./App.js";

// Render your React component in the root element
const root = createRoot(document.getElementById("app"));
root.render(<App />);
