import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useDataStore } from "../../../store";
import { useFormsData } from "../../../store/useFormsData";

const clientSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  phone: z.string().min(1, "O telefone é obrigatório."),
  email: z.string().email("O e-mail deve ser válido."),
});

export const AddClientModal = () => {
  const { modalsStates, closeModal } = useModals();
  const { setData, updateData } = useDataStore();
  const [isLoading, setIsLoading] = useState(false);

  const { formsData, resetFormsDataProps } = useFormsData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
  });

  const addClient = (data: z.infer<typeof clientSchema>) => {
    const newId = crypto.randomUUID().toString();
    const newClient = {
      id: newId,
      ...data,
    };
    setData("clients", newClient);
  };

  const updateClient = (data: z.infer<typeof clientSchema>) => {
    const updateClientStore = formsData.editClientForm;

    if (!updateClientStore) {
      return;
    }

    updateData("clients", updateClientStore.id, {
      name: data.name,
      phone: data.phone,
      email: data.email,
    });

    resetFormsDataProps("editClientForm");
  };

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    setIsLoading(true);

    const hasUpdatedClientStore = formsData.editClientForm;

    if (hasUpdatedClientStore) {
      updateClient(data);
    } else {
      addClient(data);
    }

    reset();
    setIsLoading(false);
    closeModal("addClientModal");
  };

  const onCloseModal = () => {
    reset(undefined);
    resetFormsDataProps("editClientForm");
    closeModal("addClientModal");
  };

  useEffect(() => {
    if (formsData.editClientForm) {
      reset(formsData.editClientForm);
    } else {
      reset({ name: "", phone: "", email: "" });
    }
  }, [modalsStates]);

  return (
    <MainModal
      isOpen={modalsStates.addClientModal}
      onClose={onCloseModal}
      hasClose={true}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center">
          {formsData.editClientForm ? "Editar Cliente" : "Adicionar Cliente"}
        </h2>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Nome do Cliente */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Cliente
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do cliente"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Telefone
            </label>
            <input
              id="phone"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o telefone"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* E-mail */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o e-mail"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
            {isLoading ? "Salvando..." : "Adicionar"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};
