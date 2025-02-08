import { Route, Routes, BrowserRouter } from "react-router-dom";
import {
  AddBarberModal,
  AddClientModal,
  AddServiceModal,
  Sidebar,
} from "../components";
import {
  BarbersPage,
  ClientsPage,
  HomePage,
  SchedulePage,
  ServicesPage,
} from "../pages"; // exemplo de novas páginas
import { useAuthStore } from "../store";
import { AuthPage } from "../pages/AuthPage";

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
              <Route path="/clientes" element={<ClientsPage />} />
              <Route path="/servicos" element={<ServicesPage />} />
              <Route path="/agenda" element={<SchedulePage />} />
            </Routes>
          </div>
          <AddBarberModal />
          <AddClientModal />
          <AddServiceModal />
        </div>
      )}
    </BrowserRouter>
  );
};
