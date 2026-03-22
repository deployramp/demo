import { createRoot } from "react-dom/client";
import { init, close } from "@deployramp/sdk";
import App from "./App.tsx";
import "./index.css";

init({ publicToken: "drp_pub_CQ80mPHeU1A_UVgo2TY_WCAY0B69wZpFLFoFYVYc_zw" });

window.addEventListener("beforeunload", () => {
  close();
});

createRoot(document.getElementById("root")!).render(<App />);
