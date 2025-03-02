import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useModals } from "../../../store/useModals";
import { useDataStore } from "../../../store";
import { useFormsData } from "../../../store/useFormsData";
import { MainModal } from "../../MainModal";
import { serviceSchema } from "../../../schemas";

export const AddServiceModal = () => {
  const { modalsStates, closeModal } = useModals();
  const { setData, updateData } = useDataStore();
  const [isLoading, setIsLoading] = useState(false);
  const { formsData, resetFormsDataProps } = useFormsData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
  });

  const addService = (data: z.infer<typeof serviceSchema>) => {
    const newId = crypto.randomUUID().toString();
    const newService = {
      id: newId,
      ...data,
    };
    setData("services", {
      ...newService,
      description: newService.description || "",
    });
    return newId;
  };

  const updateService = (data: z.infer<typeof serviceSchema>) => {
    const updateServiceStore = formsData.editServiceForm;
    if (!updateServiceStore) return;

    updateData("services", updateServiceStore.id, {
      name: data.name,
      description: data.description,
      price: data.price,
    });
    resetFormsDataProps("editServiceForm");
  };

  const onSubmit = async (data: z.infer<typeof serviceSchema>) => {
    setIsLoading(true);
    const hasUpdatedServiceStore = formsData.editServiceForm;
    const newServiceId = hasUpdatedServiceStore ? undefined : addService(data);
    if (hasUpdatedServiceStore) {
      updateService(data);
    }
    reset();
    setIsLoading(false);
    closeModal("addServiceModal");

    if (newServiceId) {
      const currentServices = formsData.editedAppointmentForm?.servicesId || [];
      formsData.editedAppointmentForm = {
        ...formsData.editedAppointmentForm,
        servicesId: [...currentServices, newServiceId],
        id: formsData.editedAppointmentForm?.id || "", // Ensure id is a string
        clientId: formsData.editedAppointmentForm?.clientId || "", // Ensure clientId is a string
        barberId: formsData.editedAppointmentForm?.barberId || "", // Ensure barberId is a string
        date: formsData.editedAppointmentForm?.date || "", // Ensure date is a string
        status: formsData.editedAppointmentForm?.status || "pending", // Ensure status is a valid string
      };
    }
  };

  const onCloseModal = () => {
    reset(undefined);
    resetFormsDataProps("editServiceForm");
    closeModal("addServiceModal");
  };

  useEffect(() => {
    if (formsData.editServiceForm) {
      reset(formsData.editServiceForm);
    } else {
      reset({ name: "", description: "", price: 0 });
    }
  }, [modalsStates]);

  return (
    <MainModal
      isOpen={modalsStates.addServiceModal}
      onClose={onCloseModal}
      hasClose={true}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center">
          {formsData.editServiceForm ? "Editar Serviço" : "Adicionar Serviço"}
        </h2>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Serviço
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Preço
            </label>
            <input
              id="price"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="R$ 0,00"
              {...register("price", {
                setValueAs: (value) => {
                  if (typeof value === "string") {
                    // Remove R$ and any non-numeric characters except decimal point
                    const numericValue = value
                      .replace(/[R$\s]/g, "")
                      .replace(/\./g, "")
                      .replace(/,/g, ".");
                    return parseFloat(numericValue) || 0;
                  }
                  return value;
                },
              })}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                const numericValue = parseInt(value) / 100;
                const formactedValue = numericValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
                e.target.value = formactedValue;
              }}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Adicionar"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};
