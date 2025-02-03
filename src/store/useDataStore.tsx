import { create } from "zustand";
import { BarbersProps } from "../types";
import { ClientsProps } from "../types/ClientsProps";

type defaultDataProps = {
  barbers: BarbersProps[];
  clients: ClientsProps[];
};

type DataStoreProps = {
  data: defaultDataProps;
  setData: <T extends keyof defaultDataProps>(
    dataPropName: T,
    newData: defaultDataProps[T][number]
  ) => void;
  deleteData: <T extends keyof defaultDataProps>(
    dataPropName: T,
    id: string
  ) => void;
  updateData: <T extends keyof defaultDataProps>(
    dataPropName: T,
    id: string,
    updatedData: Partial<defaultDataProps[T][number]>
  ) => void;
};

export const useDataStore = create<DataStoreProps>((set) => ({
  data: {
    barbers: [],
    clients: [],
  },
  setData: (dataPropName, newData) =>
    set((state) => {
      const updatedData = {
        ...state.data,
        [dataPropName]: [...state.data[dataPropName], newData],
      };
      return { data: updatedData };
    }),
  deleteData: (dataPropName, id) =>
    set((state) => {
      const updatedData = {
        ...state.data,
        [dataPropName]: state.data[dataPropName].filter(
          (item) => item.id !== id
        ),
      };
      return { data: updatedData };
    }),
  updateData: (dataPropName, id, updatedData) => {
    set((state) => {
      const updatedDataArray = state.data[dataPropName].map((item) => {
        if (item.id === id) {
          return { ...item, ...updatedData };
        }
        return item;
      });
      return {
        data: {
          ...state.data,
          [dataPropName]: updatedDataArray,
        },
      };
    });
  },
}));
