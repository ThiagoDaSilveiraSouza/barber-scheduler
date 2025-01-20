import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Sidebar } from "../components";
import { BarbersPage, HomePage } from "../pages"; // exemplo de novas páginas
import { useAuthStore } from "../store";
import { AuthPage } from "../pages/AuthPage";
import { AddBarberModal } from "../components/Modals/AddBarberModal";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <AuthPage />
      ) : (
        <div className="flex">
          <Sidebar />
          <div className="relative ml-10 w-full p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/barbeiros" element={<BarbersPage />} />
            </Routes>
          </div>
          <AddBarberModal />
        </div>
      )}
    </BrowserRouter>
  );
};
