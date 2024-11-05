import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./lib/store/store.js"; // Import persistor

// Import the PersistGate
import { PersistGate } from "redux-persist/integration/react";

// Import your page components
import { HomePage } from "./pages/HomePage.jsx";

import { TopSelling } from "./components/Home/TopSelling.jsx";
import { NewArrPage } from "./pages/NewArrPage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { CategoryPage } from "./pages/CategoryPage.jsx";


// Set up your router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/category/:slug",
        element: <CategoryPage />,
      },
      {
        path: "/new-arrivals/:id",
        element: <NewArrPage />,
      },
      {
        path: "/top-selling",
        element: <TopSelling />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    
    ],
  },
]);

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
