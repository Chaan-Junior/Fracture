import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductForm from "./pages/ProductForm";
import ProductUpdate from "./pages/ProductUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/createProduct",
    element: <ProductForm />,
  },
  {
    path: "/updateProduct/:id",
    element: <ProductUpdate />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
