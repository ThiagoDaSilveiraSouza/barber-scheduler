import { create } from "zustand";
import { BarbersProps } from "../types";

type defaultDataProps = {
  barbers: BarbersProps[];
};

type DataStoreProps = {
  data: defaultDataProps;
  setData: <T extends keyof defaultDataProps>(
    dataPropName: T,
    data: defaultDataProps[T]
  ) => void;
};

export const useDataStore = create<DataStoreProps>((set) => ({
  data: {
    barbers: [],
  },
  setData: (dataPropName, data) => set({ [dataPropName]: data }),
}));


useDataStore.subscribe((state) => {
  console.log("DataStore state updated:", state);
});