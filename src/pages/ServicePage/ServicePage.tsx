import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ConfirmModal } from "../../components";
import { ServicesPageHook } from "./ServicesPageHook";

export const ServicesPage = () => {
  const {
    filter,
    filteredServices,
    selectedService,
    confirmDeleteModalIsOpen,
    handleAddService,
    handleEditService,
    handleDeleteService,
    onConfirmDeleteModal,
    onCloseConfirmDeleteModal,
    setFilter,
  } = ServicesPageHook();

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        Serviços
      </h1>

      {/* Filtro */}
      <div className="mb-4 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Filtrar serviços..."
          className="input input-bordered w-full md:max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className="btn btn-primary w-full md:w-auto"
          onClick={handleAddService}
        >
          Adicionar Serviço
        </button>
      </div>

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr key={service.id}>
                  <td className="text-center">{service.id}</td>
                  <td>{service.name}</td>
                  <td>R$ {service.price.toFixed(2)}</td>
                  <td>{service.description}</td>
                  <td>
                    <div className="flex md:justify-start gap-2">
                      <button
                        className="flex justify-center align-center btn btn-outline btn-sm p-2"
                        onClick={() => handleEditService(service)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="flex justify-center items-center btn btn-outline btn-error btn-sm p-2 group hover:bg-red-600"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <FaTrashAlt className="text-red-500 group-hover:text-white transition-colors duration-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  Nenhum serviço encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ConfirmModal
          description={`Deseja realmente excluir o serviço "${selectedService?.name}"?`}
          isOpen={confirmDeleteModalIsOpen}
          onClose={onCloseConfirmDeleteModal}
          onCancel={onCloseConfirmDeleteModal}
          onConfirm={onConfirmDeleteModal}
          title="Excluir Serviço"
        />
      </div>
    </div>
  );
};
