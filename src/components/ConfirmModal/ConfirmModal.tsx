import { MainModal } from "../MainModal";

type ConfirmModalProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export const ConfirmModal = ({
  title,
  description,
  onConfirm,
  onCancel,
  isOpen,
  onClose,
}: ConfirmModalProps) => {
  return (
    <MainModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-4 p-6">
        <h2 className="text-xl font-semibold text-center">{title}</h2>
        <p className="text-center">{description}</p>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirmar
          </button>
          <button
            className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            onClick={() => {
              onCancel();
              onClose();
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </MainModal>
  );
};
