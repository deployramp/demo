import { createRoot } from "react-dom/client";
import { init } from "@deployramp/sdk";
import App from "./App.tsx";
import "./index.css";

init({
  publicToken: import.meta.env.VITE_DEPLOYRAMP_TOKEN,
  traits: { environment: window.location.hostname === "demo.deployramp.com" ? "prod" : "dev" },
});

createRoot(document.getElementById("root")!).render(<App />);
