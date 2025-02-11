type MainModalProps = {
  children: React.ReactNode;
  isOpen: boolean; // Controla se o modal está aberto
  onClose: () => void; // Função para fechar o modal
  hasClose?: boolean; // Controla se o modal tem um botão de fechar
};

export const MainModal = ({
  children,
  isOpen,
  onClose,
  hasClose = true,
}: MainModalProps) => {
  const onCloseHandlerClick = () => {
    hasClose && onClose();
  };
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50  ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden"
      }`}
      style={{ transition: "opacity 0.5s ease-in-out" }}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseHandlerClick}
      />
      {/* Backdrop */}
      <div
        className={`relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Modal content */}
        {hasClose && (
          <button
            onClick={onCloseHandlerClick}
            className="absolute top-2 right-2 text-gray-600 bg-transparent border-none text-xl"
          >
            &times; {/* Ícone de fechar */}
          </button>
        )}
        <div className="max-h-screen">{children}</div>
      </div>
    </div>
  );
};
