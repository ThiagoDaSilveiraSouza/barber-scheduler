
export type AppointmentsProps = {
  id: string;
  clientId: string;
  barberId: string;
  servicesId: string[];
  date: Date;
  status: "pending" | "completed" | "canceled";
};
