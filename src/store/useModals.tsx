import { create } from "zustand";

const defaultModalsStates = {
  authModal: true,
  AddBarberModal: false,
  addClientModal: false,
};

type UseModalsProps = {
  modalsStates: typeof defaultModalsStates;
  openModal: (modalName: keyof typeof defaultModalsStates) => void;
  closeModal: (modalName: keyof typeof defaultModalsStates) => void;
  togleModal: (modalName: keyof typeof defaultModalsStates) => void;
};

export const useModals = create<UseModalsProps>((set) => ({
  modalsStates: defaultModalsStates,
  openModal: (modalName) => {
    set((prevState) => ({
      modalsStates: {
        ...prevState.modalsStates,
        [modalName]: true,
      },
    }));
  },
  closeModal: (modalName) => {
    set((prevState) => ({
      modalsStates: {
        ...prevState.modalsStates,
        [modalName]: false,
      },
    }));
  },
  togleModal: (modalName) => {
    set((prevState) => ({
      modalsStates: {
        ...prevState.modalsStates,
        [modalName]: !prevState.modalsStates[modalName],
      },
    }));
  },
}));
