import { z } from "zod";

export const barberSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  specialty: z.string().min(1, "A especialidade é obrigatória."),
});
