import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useDataStore } from "../../../store";
import { useFormsData } from "../../../store/useFormsData";
import { barberSchema } from "../../../schemas";

export const AddBarberModal = () => {
  const { modalsStates, closeModal } = useModals();
  const { setData, updateData } = useDataStore();
  const [isLoading, setIsLoading] = useState(false);

  const { formsData, resetFormsDataProps } = useFormsData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof barberSchema>>({
    resolver: zodResolver(barberSchema),
  });

  const addBarber = (data: z.infer<typeof barberSchema>) => {
    const newId = crypto.randomUUID().toString();
    const newBarber = {
      id: newId,
      ...data,
    };
    setData("barbers", newBarber);
    return newId;
  };

  const updatedBarber = (data: z.infer<typeof barberSchema>) => {
    const updateBarberStore = formsData.editBarberForm;

    if (!updateBarberStore) {
      return;
    }

    updateData("barbers", updateBarberStore.id, {
      name: data.name,
      specialty: data.specialty,
    });

    resetFormsDataProps("editBarberForm");
  };

  const onSubmit = async (data: z.infer<typeof barberSchema>) => {
    setIsLoading(true);

    const hasUpdatedBarberStore = formsData.editBarberForm;
    let newBarberId;

    if (hasUpdatedBarberStore) {
      updatedBarber(data);
    } else {
      newBarberId = addBarber(data);
    }

    reset();
    setIsLoading(false);
    closeModal("AddBarberModal");
    
    // Se um novo barbeiro foi adicionado, atualiza o formulário de agendamento
    if (newBarberId && formsData.editedAppointmentForm) {
      formsData.editedAppointmentForm = {
        ...formsData.editedAppointmentForm,
        barberId: newBarberId
      };
    }
  };

  const onCloseModal = () => {
    reset(undefined);
    resetFormsDataProps("editBarberForm");
    closeModal("AddBarberModal");
  };

  useEffect(() => {
    if (formsData.editBarberForm) {
      reset(formsData.editBarberForm);
    } else {
      reset({ name: "", specialty: "" });
    }
  }, [modalsStates]);

  return (
    <MainModal
      isOpen={modalsStates.AddBarberModal}
      onClose={onCloseModal}
      hasClose={true}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center">
          {formsData.editBarberForm ? "Editar Barbeiro" : "Adicionar Barbeiro"}
        </h2>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Nome do Barbeiro */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Barbeiro
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do barbeiro"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Especialidade */}
          <div>
            <label
              htmlFor="specialty"
              className="block text-sm font-medium text-gray-700"
            >
              Especialidade
            </label>
            <input
              id="specialty"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a especialidade"
              {...register("specialty")}
            />
            {errors.specialty && (
              <p className="text-red-500 text-sm">{errors.specialty.message}</p>
            )}
          </div>

          {/* Botão de Adicionar */}
          <button
            type="submit"
            className={`w-full py-2 px-4 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Salvando...
                {/* Adicione um spinner aqui, se necessário */}
              </>
            ) : (
              "Adicionar"
            )}
          </button>
        </form>
      </div>
    </MainModal>
  );
};
