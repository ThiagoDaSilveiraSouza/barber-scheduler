import { useState } from "react";
import { useDataStore, useModals } from "../../store";
import { useFormsData } from "../../store/useFormsData";
import { ClientsProps } from "../../types/ClientsProps";
import { slugfy } from "../../utils";

export const ClientsPageHook = () => {
  const { data, deleteData } = useDataStore();
  const { clients } = data;
  const [filter, setFilter] = useState("");
  const { openModal } = useModals();
  const { setFormsData } = useFormsData();
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false);
  const [selectedId, setSelectedId] = useState("");
  const selectedClient = clients.find((client) => client.id === selectedId);

  const handleAddClient = () => {
    openModal("addClientModal");
  };

  const handleEditClient = async (data: ClientsProps) => {
    setFormsData("editClientForm", data);
    openModal("addClientModal");
  };

  const handleDeleteClient = (id: string) => {
    setConfirmDeleteModalIsOpen(true);
    setSelectedId(id);
  };

  const onConfirmDeleteModal = async () => {
    deleteData("clients", selectedId);
    setSelectedId("");
    setConfirmDeleteModalIsOpen(false);
  };

  const onCloseConfirmDeleteModal = () => {
    setConfirmDeleteModalIsOpen(false);
  };

  const filteredClients = clients.filter((client) => {
    const slugfyedClientName = slugfy(client.name);
    const slugfyedFilter = slugfy(filter);
    return slugfyedClientName.includes(slugfyedFilter);
  });

  return {
    handleAddClient,
    handleEditClient,
    handleDeleteClient,
    onConfirmDeleteModal,
    onCloseConfirmDeleteModal,
    setFilter,
    filter,
    filteredClients,
    confirmDeleteModalIsOpen,
    selectedClient,
    selectedId,
  };
};
