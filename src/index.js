import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DetailArticles, Home } from "./pages";
import { Footer, Header } from "./components";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/articles/:id",
    element: <DetailArticles />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);
root.render(
  <QueryClientProvider client={queryClient}>
    <Header></Header>
    <RouterProvider router={router} />
    <Footer></Footer>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
