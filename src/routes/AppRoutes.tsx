import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthModal } from "../components";
import { HomePage } from "../pages"; // exemplo de novas páginas

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="relative ml-64 w-full p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>

        {/* Aqui você pode adicionar o modal conforme o estado do aplicativo */}
        <AuthModal />
      </div>
    </BrowserRouter>
  );
};
