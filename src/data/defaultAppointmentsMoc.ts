import { AppointmentsProps } from "../types";

export const defaultAppointmentsMoc: AppointmentsProps[] = [
  {
    id: "1",
    client: {
      id: "c1",
      name: "João",
      phone: "123456789",
      email: "joao@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
    ],
    date: new Date("2025-02-10T09:00:00"),
    status: "pending",
  },
  {
    id: "2",
    client: {
      id: "c2",
      name: "Pedro",
      phone: "987654321",
      email: "pedro@email.com",
    },
    barber: { id: "b2", name: "Ricardo", specialty: "Barba" },
    services: [
      { id: "s2", name: "Barba", price: 30, description: "Aparar e alinhar" },
    ],
    date: new Date("2025-02-10T11:00:00"),
    status: "completed",
  },
  {
    id: "3",
    client: {
      id: "c3",
      name: "Lucas",
      phone: "123123123",
      email: "lucas@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
      { id: "s2", name: "Barba", price: 30, description: "Aparar e alinhar" },
    ],
    date: new Date("2025-02-12T14:00:00"),
    status: "pending",
  },
  {
    id: "4",
    client: {
      id: "c4",
      name: "Maria",
      phone: "111222333",
      email: "maria@email.com",
    },
    barber: { id: "b3", name: "Fernanda", specialty: "Hidratação" },
    services: [
      {
        id: "s3",
        name: "Hidratação",
        price: 80,
        description: "Hidratação profunda",
      },
    ],
    date: new Date("2025-02-15T16:00:00"),
    status: "pending",
  },
  {
    id: "5",
    client: {
      id: "c5",
      name: "Fernanda",
      phone: "444555666",
      email: "fernanda@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
    ],
    date: new Date("2025-02-15T18:00:00"),
    status: "canceled",
  },
  {
    id: "6",
    client: {
      id: "c6",
      name: "Ana",
      phone: "777888999",
      email: "ana@email.com",
    },
    barber: { id: "b4", name: "Sofia", specialty: "Penteado" },
    services: [
      {
        id: "s4",
        name: "Penteado",
        price: 100,
        description: "Penteado especial",
      },
    ],
    date: new Date("2025-02-20T10:00:00"),
    status: "pending",
  },
  {
    id: "7",
    client: {
      id: "c7",
      name: "Marcos",
      phone: "999888777",
      email: "marcos@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
    ],
    date: new Date("2025-02-20T12:00:00"),
    status: "completed",
  },
  {
    id: "8",
    client: {
      id: "c8",
      name: "Sofia",
      phone: "555444333",
      email: "sofia@email.com",
    },
    barber: { id: "b2", name: "Ricardo", specialty: "Tratamento Capilar" },
    services: [
      {
        id: "s5",
        name: "Tratamento Capilar",
        price: 120,
        description: "Fortalecimento capilar",
      },
    ],
    date: new Date("2025-02-20T14:00:00"),
    status: "pending",
  },
  {
    id: "9",
    client: {
      id: "c9",
      name: "Beatriz",
      phone: "222333444",
      email: "beatriz@email.com",
    },
    barber: { id: "b3", name: "Fernanda", specialty: "Coloração" },
    services: [
      {
        id: "s6",
        name: "Coloração",
        price: 150,
        description: "Tintura completa",
      },
    ],
    date: new Date("2025-02-25T09:00:00"),
    status: "pending",
  },
  {
    id: "10",
    client: {
      id: "c10",
      name: "Gabriel",
      phone: "666777888",
      email: "gabriel@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
    ],
    date: new Date("2025-02-25T11:00:00"),
    status: "completed",
  },
  {
    id: "10",
    client: {
      id: "c10",
      name: "Gabriel",
      phone: "666777888",
      email: "gabriel@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
    ],
    date: new Date("2025-02-25T11:00:00"),
    status: "completed",
  },
  {
    id: "10",
    client: {
      id: "c10",
      name: "Gabriel",
      phone: "666777888",
      email: "gabriel@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
    ],
    date: new Date("2025-02-25T11:00:00"),
    status: "completed",
  },
  {
    id: "10",
    client: {
      id: "c10",
      name: "Gabriel",
      phone: "666777888",
      email: "gabriel@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
    ],
    date: new Date("2025-02-25T11:00:00"),
    status: "completed",
  },
  {
    id: "10",
    client: {
      id: "c10",
      name: "Gabriel",
      phone: "666777888",
      email: "gabriel@email.com",
    },
    barber: { id: "b1", name: "Carlos", specialty: "Corte Masculino" },
    services: [
      {
        id: "s1",
        name: "Corte de Cabelo",
        price: 50,
        description: "Corte clássico",
      },
    ],
    date: new Date("2025-02-25T11:00:00"),
    status: "completed",
  },
];
