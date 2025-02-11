import { create } from "zustand";
import { AppointmentsProps, BarbersProps, ServicesProps } from "../types";
import { ClientsProps } from "../types/ClientsProps";

type UseFormsProps = {
  formsData: {
    loginForm?: {
      email: string;
      password: string;
    };
    registerForm?: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };
    editBarberForm?: BarbersProps;
    editClientForm?: ClientsProps;
    editServiceForm?: ServicesProps;
    editedAppointmentForm?: AppointmentsProps;
  };
  setFormsData: <T extends keyof UseFormsProps["formsData"]>(
    formName: T,
    data: UseFormsProps["formsData"][T]
  ) => void;
  resetFormsDataProps: <T extends keyof UseFormsProps["formsData"]>(
    formDataProp: T
  ) => void;
};

const defaultFormData: UseFormsProps["formsData"] = {
  loginForm: {
    email: "",
    password: "",
  },
  registerForm: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  editBarberForm: undefined,
  editedAppointmentForm: undefined,
};

export const useFormsData = create<UseFormsProps>((set) => ({
  formsData: defaultFormData,
  setFormsData: (formName, data) =>
    set((state) => ({
      formsData: {
        ...state.formsData,
        [formName]: data,
      },
    })),
  resetFormsDataProps: (formDataProp) => {
    set((state) => ({
      formsData: {
        ...state.formsData,
        [formDataProp]: defaultFormData[formDataProp],
      },
    }));
  },
}));
