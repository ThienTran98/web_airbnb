import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutDefault from "./HOC/LayoutDefault";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import DetailPage from "./Pages/DetailPage/DetailPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutDefault>
                <HomePage />
              </LayoutDefault>
            }
          />
          <Route
            path="/login"
            element={
              <LayoutDefault>
                <LoginPage />
              </LayoutDefault>
            }
          />
          <Route
            path="/register"
            element={
              <LayoutDefault>
                <RegisterPage />
              </LayoutDefault>
            }
          />
          <Route
            path="/payment"
            element={
              <LayoutDefault>
                <PaymentPage />
              </LayoutDefault>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <LayoutDefault>
                <DetailPage />
              </LayoutDefault>
            }
          />
          <Route
            path="*"
            element={
              <LayoutDefault>
                <NotFoundPage />
              </LayoutDefault>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
