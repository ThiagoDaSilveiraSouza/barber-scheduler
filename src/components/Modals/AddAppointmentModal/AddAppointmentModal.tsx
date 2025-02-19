import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useDataStore } from "../../../store";
import { useFormsData } from "../../../store/useFormsData";
import { appointmentSchema } from "../../../schemas"; // Certifique-se de ter definido esse schema com Zod
import { AppointmentsProps } from "../../../types";
import { FiPlus } from "react-icons/fi";

export const AddAppointmentModal = () => {
  const { modalsStates, closeModal, openModal } = useModals();
  const { setData, updateData } = useDataStore();
  const { formsData, resetFormsDataProps } = useFormsData();
  const { data } = useDataStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
  });

  const addAppointment = (data: z.infer<typeof appointmentSchema>) => {
    const newId = crypto.randomUUID().toString();
    const newAppointment: AppointmentsProps = {
      id: newId,
      ...data,
    };
    setData("appointments", newAppointment);
  };

  const updateAppointment = (data: z.infer<typeof appointmentSchema>) => {
    const editData = formsData.editedAppointmentForm;
    if (!editData) return;

    updateData("appointments", editData.id, data);
    resetFormsDataProps("editedAppointmentForm");
  };

  const onSubmit = async (data: z.infer<typeof appointmentSchema>) => {
    setIsLoading(true);

    if (formsData.editedAppointmentForm) {
      updateAppointment(data);
    } else {
      addAppointment(data);
    }

    reset();
    setIsLoading(false);
    closeModal("AddAppointmentModal");
  };

  const onCloseModal = () => {
    reset();
    resetFormsDataProps("editedAppointmentForm");
    closeModal("AddAppointmentModal");
  };

  useEffect(() => {
    if (formsData.editedAppointmentForm) {
      reset(formsData.editedAppointmentForm);
    } else {
      // const today = new Date().toISOString().split("T")[0];
      // reset({ date: today, customer: "", barber: "", service: "" });
    }
  }, [formsData.editedAppointmentForm, modalsStates]);

  return (
    <MainModal
      isOpen={modalsStates.AddAppointmentModal}
      onClose={onCloseModal}
      hasClose={true}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center">
          {formsData.editedAppointmentForm
            ? "Editar Agendamento"
            : "Adicionar Agendamento"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {/* Data do Agendamento */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Data do Agendamento
            </label>
            <input
              id="date"
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("date")}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Nome do Cliente */}
          <div>
            <label
              htmlFor="customer"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Cliente
            </label>
            <div className="flex items-center gap-2">
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("clientId")}
              >
                <option value="" selected disabled></option>
                {data.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <button
                className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                type="button"
                onClick={() => {
                  openModal("addClientModal");
                }}
              >
                <FiPlus size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Nome do Barbeiro */}
          <div>
            <label
              htmlFor="barber"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Barbeiro
            </label>
            <div className="flex items-center gap-2">
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("barberId")}
              >
                <option value="" selected disabled></option>
                {data.barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
              </select>
              <button
                className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                type="button"
                onClick={() => {
                  openModal("AddBarberModal");
                }}
              >
                <FiPlus size={20} className="text-gray-600" />
              </button>
            </div>
            {errors.barberId && (
              <p className="text-red-500 text-sm">{errors.barberId.message}</p>
            )}
          </div>

          {/* Serviço */}
          <div>
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-700"
            >
              Serviço
            </label>
            <div className="flex items-center gap-2">
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" selected disabled></option>
                {data.services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              <button
                className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                type="button"
                onClick={() => {
                  openModal("addServiceModal");
                }}
              >
                <FiPlus size={20} className="text-gray-600" />
              </button>
            </div>
            {errors.servicesId && (
              <p className="text-red-500 text-sm">
                {errors.servicesId.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isLoading
              ? "Salvando..."
              : formsData.editedAppointmentForm
              ? "Salvar"
              : "Adicionar"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};
