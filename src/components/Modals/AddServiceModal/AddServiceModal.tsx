import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useDataStore } from "../../../store";
import { useFormsData } from "../../../store/useFormsData";
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
    setData("services", newService);
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
    hasUpdatedServiceStore ? updateService(data) : addService(data);
    reset();
    setIsLoading(false);
    closeModal("addServiceModal");
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
              type="number"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("price")}
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
