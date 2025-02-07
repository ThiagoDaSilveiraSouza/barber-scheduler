import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(3, "O nome do serviço deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  price: z
    .number()
    .positive("O preço deve ser um valor positivo")
    .or(
      z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "O preço deve ser um número válido")
        .transform((val) => parseFloat(val))
    ),
});
