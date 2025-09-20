import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/Router.jsx";
import FirebaseAuthProvider from "./firebase/FirebaseAuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-uniquifie max-w-6xl mx-auto">
      {" "}
      <FirebaseAuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </FirebaseAuthProvider>
    </div>
  </StrictMode>
);
