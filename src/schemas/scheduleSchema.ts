import { z } from "zod";
import { barberSchema } from "./barberSchema";
import { clientSchema } from "./clientSchema";
import { serviceSchema } from "./serviceSchema";

export const scheduleSchema = z.object({
  client: clientSchema,
  services: z.array(serviceSchema).min(1, "É necessário ao menos um serviço"),
  barber: barberSchema,
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Horário inválido (HH:MM)"),
});
