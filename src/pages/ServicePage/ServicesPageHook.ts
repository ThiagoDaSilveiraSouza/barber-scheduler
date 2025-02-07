import { useState } from "react";
import { useDataStore, useModals } from "../../store";
import { useFormsData } from "../../store/useFormsData";
import { ServicesProps } from "../../types/ServicesProps";
import { slugfy } from "../../utils";

export const ServicesPageHook = () => {
  const { data, deleteData } = useDataStore();
  const { services } = data;
  const [filter, setFilter] = useState("");
  const { openModal } = useModals();
  const { setFormsData } = useFormsData();
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false);
  const [selectedId, setSelectedId] = useState("");
  const selectedService = services.find((service) => service.id === selectedId);

  const handleAddService = () => {
    openModal("addServiceModal");
  };

  const handleEditService = async (data: ServicesProps) => {
    setFormsData("editServiceForm", data);
    openModal("addServiceModal");
  };

  const handleDeleteService = (id: string) => {
    setConfirmDeleteModalIsOpen(true);
    setSelectedId(id);
  };

  const onConfirmDeleteModal = async () => {
    deleteData("services", selectedId);
    setSelectedId("");
    setConfirmDeleteModalIsOpen(false);
  };

  const onCloseConfirmDeleteModal = () => {
    setConfirmDeleteModalIsOpen(false);
  };

  const filteredServices = services.filter((service) => {
    const slugfyedServiceName = slugfy(service.name);
    const slugfyedFilter = slugfy(filter);
    return slugfyedServiceName.includes(slugfyedFilter);
  });

  return {
    handleAddService,
    handleEditService,
    handleDeleteService,
    onConfirmDeleteModal,
    onCloseConfirmDeleteModal,
    setFilter,
    filter,
    filteredServices,
    confirmDeleteModalIsOpen,
    selectedService,
    selectedId,
  };
};
