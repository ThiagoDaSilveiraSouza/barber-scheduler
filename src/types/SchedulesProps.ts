import { BarbersProps } from "./BarbersProps";
import { ClientsProps } from "./ClientsProps";
import { ServicesProps } from "./ServicesProps";

export type SchedulesProps = {
  id: string;
  client: ClientsProps;
  services: ServicesProps[];
  barber: BarbersProps;
  date: string;
  time: string;
};
