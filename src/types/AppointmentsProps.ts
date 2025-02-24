
export type AppointmentsProps = {
  id: string;
  clientId: string;
  barberId: string;
  servicesId: string[];
  date: string;
  status: "pending" | "completed" | "canceled";
};
