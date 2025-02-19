import { z } from "zod";

export const appointmentSchema = z.object({
  clientId: z.string().nonempty("O ID do cliente é obrigatório"),
  barberId: z.string().nonempty("O ID do barbeiro é obrigatório"),
  servicesId: z
    .array(z.string())
    .nonempty("É necessário informar ao menos um serviço"),
  date: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    },
    z.date({ invalid_type_error: "Data inválida" })
  ),
  status: z.enum(["pending", "completed", "canceled"], {
    errorMap: () => ({ message: "Status deve ser 'pending', 'completed' ou 'canceled'" }),
  }),
});
