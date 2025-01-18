import { z } from "zod";

export const schema = z.object({
  username: z
    .string()
    .email("Formato de email inválido")
    .nonempty("Email é obrigatório"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});
