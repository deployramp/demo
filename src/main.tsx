import { createRoot } from "react-dom/client";
import { init } from "@deployramp/sdk";
import App from "./App.tsx";
import "./index.css";

init({
  publicToken: import.meta.env.VITE_DEPLOYRAMP_TOKEN,
  traits: { environment: window.location.hostname === "demo.deployramp.com" ? "prod" : "dev" },
  feedback: {
    position: "bottom-right",
    backgroundColor: "hsl(240, 10%, 6%)",
    textColor: "hsl(0, 0%, 98%)",
    accentColor: "hsl(217.2, 91.2%, 59.8%)",
  },
});

createRoot(document.getElementById("root")!).render(<App />);
