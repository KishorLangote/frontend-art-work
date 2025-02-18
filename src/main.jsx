import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css'
import ArtEventDetails from "./pages/ArtEventDetails.jsx";
import ArtistArtsWork from "./pages/ArtistArtsWork.jsx";
import ArtEventListing from "./pages/ArtEventListing.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/artEvents",
    element: <ArtEventListing />,
  },

  {
    path: "/artEvents/:id",
    element: <ArtEventDetails />,
  },

  {
    path: "/artEvents/artists/:artistId/arts",
    element: <ArtistArtsWork />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
