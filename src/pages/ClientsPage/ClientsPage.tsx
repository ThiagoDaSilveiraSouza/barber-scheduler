import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ConfirmModal } from "../../components";
import { ClientsPageHook } from "./ClientsPageHook";

export const ClientsPage = () => {
  const {
    filter,
    filteredClients,
    selectedClient,
    confirmDeleteModalIsOpen,
    handleAddClient,
    handleEditClient,
    handleDeleteClient,
    onConfirmDeleteModal,
    onCloseConfirmDeleteModal,
    setFilter,
  } = ClientsPageHook();

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        Clientes
      </h1>

      {/* Filtro */}
      <div className="mb-4 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Filtrar clientes..."
          className="input input-bordered w-full md:max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className="btn btn-primary w-full md:w-auto"
          onClick={handleAddClient}
        >
          Adicionar Cliente
        </button>
      </div>

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.id}>
                  <td className="text-center">{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>
                    <div className="flex md:justify-start gap-2">
                      <button
                        className="flex justify-center align-center btn btn-outline btn-sm p-2"
                        onClick={() => handleEditClient(client)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="flex justify-center items-center btn btn-outline btn-error btn-sm p-2 group hover:bg-red-600"
                        onClick={() => handleDeleteClient(client.id)}
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
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ConfirmModal
          description={`Deseja realmente excluir o cliente "${selectedClient?.name}"?`}
          isOpen={confirmDeleteModalIsOpen}
          onClose={onCloseConfirmDeleteModal}
          onCancel={onCloseConfirmDeleteModal}
          onConfirm={onConfirmDeleteModal}
          title="Excluir Cliente"
        />
      </div>
    </div>
  );
};
