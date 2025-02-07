import { z } from "zod";

export const authSchema = z.object({
  username: z.string().nonempty("Nome é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
});
