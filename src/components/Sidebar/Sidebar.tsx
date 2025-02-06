import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";

type LinkElementProps = {
  isOpen: boolean;
  to?: string;
  children?: ReactNode;
  onClick?: () => void;
};

const LinkElement = ({
  isOpen,
  to = "/",
  children,
  onClick,
}: LinkElementProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-white hover:bg-gray-700 py-2 px-4 rounded-md transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {children}
    </Link>
  );
};

const linkList = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Barbeiros",
    to: "/barbeiros",
  },
  {
    name: "Clientes",
    to: "/clientes",
  },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();

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
      <div className="flex justify-between items-center p-4 bg-gray-900 ">
        {/* Título que aparece/oculta dependendo da largura */}
        <h2
          className={`text-xl font-bold transition-opacity duration-300 overflow-hidden min-w-100 w-64${
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
      <div className="flex flex-col space-y-4 p-4 w-64">
        {linkList.map((link) => (
          <LinkElement
            key={link.name}
            isOpen={isOpen}
            to={link.to}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </LinkElement>
        ))}
      </div>

      {/* Botão de logout */}
      <div className="mt-auto p-4">
        <button
          onClick={logout}
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
