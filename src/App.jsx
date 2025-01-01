import "./App.css";
import Orders from "./Front/Orders";
import Home from "./Front/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { VisitProvider } from "./contexts/VisitContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);

function App() {
  return (
    <VisitProvider>
      <RouterProvider router={router}></RouterProvider>
    </VisitProvider>
  );
}

export default App;
