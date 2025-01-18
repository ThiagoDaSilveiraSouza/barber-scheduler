import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64">
      <div className="flex justify-between items-center p-4 bg-gray-900">
        <h2 className="text-xl font-bold">Meu App</h2>
      </div>

      <div className="flex flex-col space-y-4 p-4">
        {/* Links de navegação */}
        <Link
          to="/"
          className="text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300"
        >
          Home
        </Link>

        {/* Botão de logout */}
        <button
          onClick={() => console.log("Logout")}
          className="mt-auto text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md transition duration-300"
        >
          Sair
        </button>
      </div>
    </div>
  );
};
