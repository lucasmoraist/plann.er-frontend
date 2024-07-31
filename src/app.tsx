import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { ErrorPage } from "./pages/error/error404";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <CreateTripPage />,
    },
    {
      path: "/trips/:tripId",
      element: <TripDetailsPage />,
      errorElement: <ErrorPage />
    },
  ],
  {
    basename: "/plann.er-frontend",
  }
);

export function App() {
  return <RouterProvider router={router} />;
}
