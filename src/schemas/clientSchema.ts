import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  phone: z.string().min(1, "O telefone é obrigatório."),
  email: z.string().email("O e-mail deve ser válido."),
});
