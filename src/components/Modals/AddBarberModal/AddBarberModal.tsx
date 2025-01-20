import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Esquema Zod para validação
const barberSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  specialty: z.string().min(1, "A especialidade é obrigatória."),
});

export const AddBarberModal = () => {
  const { modalsStates, closeModal } = useModals();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof barberSchema>>({
    resolver: zodResolver(barberSchema),
  });

  const onSubmit = async (data: z.infer<typeof barberSchema>) => {
    setIsLoading(true);
    // Simulação de envio dos dados para API
    try {
      console.log("Dados do barbeiro:", data);
      // Após o sucesso, fechar o modal
      closeModal("AddBarberModal");
    } catch (error) {
      console.error("Erro ao adicionar barbeiro:", error);
    }
    setIsLoading(false);
  };

  return (
    <MainModal
      isOpen={modalsStates.AddBarberModal}
      onClose={() => closeModal("AddBarberModal")}
      hasClose={true}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center">
          Adicionar Barbeiro
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
