import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { z } from "zod";

export const AuthModal = () => {
  const { modalsStates, closeModal } = useModals();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema), // Passando o esquema Zod para o React Hook Form
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Dados enviados:", data);
  };

  return (
    <MainModal
      isOpen={modalsStates.authModal}
      onClose={() => closeModal("authModal")}
      hasClose={false}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center">Autenticação</h2>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nome de usuário
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome de usuário"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </MainModal>
  );
};
