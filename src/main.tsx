import { createRoot } from "react-dom/client";
import { init } from "@deployramp/sdk";
import App from "./App.tsx";
import "./index.css";

init({
  publicToken: import.meta.env.VITE_DEPLOYRAMP_TOKEN,
});

createRoot(document.getElementById("root")!).render(<App />);
