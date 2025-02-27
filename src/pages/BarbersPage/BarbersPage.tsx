import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { slugfy } from "../../utils";
import { useDataStore, useModals } from "../../store";
import { BarbersProps } from "../../types";
import { useFormsData } from "../../store/useFormsData";
import { ConfirmModal } from "../../components";

export const BarbersPage = () => {
  const { data, deleteData } = useDataStore();
  const { barbers } = data;
  const [filter, setFilter] = useState("");
  const { openModal } = useModals();
  const { setFormsData } = useFormsData();
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false);
  const [selectedId, setSelectedId] = useState("");
  const selectedBarber = barbers.find((barber) => barber.id === selectedId);

  const handleAddBarber = () => {
    openModal("AddBarberModal");
  };

  const handleEditBarber = async (data: BarbersProps) => {
    setFormsData("editBarberForm", data);
    openModal("AddBarberModal");
  };

  const handleDeleteBarber = (id: string) => {
    setConfirmDeleteModalIsOpen(true);
    setSelectedId(id);
  };

  const onConfirmDeleteModal = async () => {
    deleteData("barbers", selectedId);
    setSelectedId("");
    setConfirmDeleteModalIsOpen(false);
  };

  const onCloseConfirmDeleteModal = () => {
    setConfirmDeleteModalIsOpen(false);
  };

  const filteredBarbers = barbers.filter((barber) => {
    const slugfyedBarberName = slugfy(barber.name);
    const slugfyedFilter = slugfy(filter);
    return slugfyedBarberName.includes(slugfyedFilter);
  });

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        Barbeiros
      </h1>

      {/* Filtro */}
      <div className="mb-4 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Filtrar barbeiros..."
          className="input input-bordered w-full md:max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className="btn btn-primary w-full md:w-auto"
          onClick={handleAddBarber}
        >
          Adicionar Barbeiro
        </button>
      </div>

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredBarbers.length > 0 ? (
              filteredBarbers.map((barber) => (
                <tr key={barber.id}>
                  <td className="text-center">{barber.id}</td>
                  <td>{barber.name}</td>
                  <td>{barber.specialty}</td>
                  <td>
                    <div className="flex md:justify-start gap-2">
                      <button
                        className="flex justify-center align-center btn btn-outline btn-sm p-2"
                        onClick={() => handleEditBarber(barber)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="flex justify-center items-center btn btn-outline btn-error btn-sm p-2 group hover:bg-red-600"
                        onClick={() => handleDeleteBarber(barber.id)}
                      >
                        <FaTrashAlt className="text-red-500 group-hover:text-white transition-colors duration-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  Nenhum barbeiro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ConfirmModal
          description={`Deseja realmente excluir o barbeiro "${selectedBarber?.name}"?`}
          isOpen={confirmDeleteModalIsOpen}
          onClose={onCloseConfirmDeleteModal}
          onCancel={onCloseConfirmDeleteModal}
          onConfirm={onConfirmDeleteModal}
          title="Excluir Barbeiro"
        />
      </div>
    </div>
  );
};
