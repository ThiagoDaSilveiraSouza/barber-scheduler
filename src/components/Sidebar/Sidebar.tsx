import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Cabeçalho com botão de alternar */}
      <div className="flex justify-between items-center p-4 bg-gray-900">
        {/* Título que aparece/oculta dependendo da largura */}
        <h2
          className={`text-xl font-bold transition-opacity duration-300 overflow-hidden min-w-100 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"
          }`}
        >
          Meu App
        </h2>
        <button
          onClick={toggleSidebar}
          className="text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-md  "
        >
          {isOpen ? "⮜" : "⮞"}
        </button>
      </div>

      {/* Links de navegação */}
      <div className="flex flex-col space-y-4 p-4">
        <Link
          to="/"
          className={`text-white hover:bg-gray-700 py-2 px-4 rounded-md transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          Home
        </Link>
        <Link
          to="/barbeiros"
          className={`text-white hover:bg-gray-700 py-2 px-4 rounded-md transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          Barbeiros
        </Link>
      </div>

      {/* Botão de logout */}
      <div className="mt-auto p-4">
        <button
          onClick={() => console.log("Logout")}
          className={`text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          Sair
        </button>
      </div>
    </div>
  );
};
