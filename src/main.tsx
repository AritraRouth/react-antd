import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2123bf",
            fontFamily: "'Roboto'",
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ConfigProvider>
    </PersistGate>
  </Provider>
);
