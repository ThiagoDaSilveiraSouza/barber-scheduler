import { BarbersProps } from "./BarbersProps";
import { ClientsProps } from "./ClientsProps";
import { ServicesProps } from "./ServicesProps";

export type AppointmentsProps = {
  id: string;
  client: ClientsProps;
  barber: BarbersProps;
  services: ServicesProps[];
  date: Date;
  status: "pending" | "completed" | "canceled";
};
