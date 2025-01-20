import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Sidebar } from "../components";
import { HomePage } from "../pages"; // exemplo de novas páginas
import { useAuthStore } from "../store";
import { LoadingPage } from "../pages/LoadingPage";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <LoadingPage />
      ) : (
        <div className="flex">
          <Sidebar />
          <div className="relative ml-64 w-full p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>

          {/* Aqui você pode adicionar o modal conforme o estado do aplicativo */}
        </div>
      )}
    </BrowserRouter>
  );
};
