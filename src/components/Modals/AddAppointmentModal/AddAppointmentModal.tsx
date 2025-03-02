import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useDataStore } from "../../../store";
import { useFormsData } from "../../../store/useFormsData";
import { appointmentSchema } from "../../../schemas"; // Certifique-se de ter definido esse schema com Zod
import { AppointmentsProps } from "../../../types";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ptBR } from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

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
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: formsData.editedAppointmentForm?.date
        ? new Date(formsData.editedAppointmentForm.date)
        : new Date(),
      status: "pending",
      servicesId: formsData.editedAppointmentForm?.servicesId || [],
      clientId: formsData.editedAppointmentForm?.clientId || "",
      barberId: formsData.editedAppointmentForm?.barberId || "",
    },
  });

  const selectedDate = watch("date");
  const [dayAppointments, setDayAppointments] = useState<AppointmentsProps[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 12).toISOString().split('T')[0];
      const filteredAppointments = data.appointments.filter(
        (appointment) => appointment.date === dateStr
      );
      setDayAppointments(filteredAppointments);
    }
  }, [selectedDate, data.appointments]);

  useEffect(() => {
    if (formsData.editedAppointmentForm) {
      const { date, servicesId, clientId, barberId, status } =
        formsData.editedAppointmentForm;
      // Cria a data corretamente para evitar problemas de fuso horário
      let newDate;
      if (date) {
        // Garante que a data seja criada no fuso horário UTC
        newDate = new Date(date + 'T12:00:00Z');
      } else {
        newDate = new Date();
      }
      setValue("date", newDate);
      setValue(
        "servicesId",
        servicesId && servicesId.length > 0
          ? (servicesId as [string, ...string[]])
          : [""] // Provide a default non-empty array to satisfy the type requirement
      );
      setValue("clientId", clientId || "");
      setValue("barberId", barberId || "");
      setValue("status", status || "pending");
      
      // Atualiza a lista de agendamentos para a data selecionada
      const dateStr = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 12).toISOString().split('T')[0];
      const filteredAppointments = data.appointments.filter(
        (appointment) => appointment.date === dateStr
      );
      setDayAppointments(filteredAppointments);
    }
  }, [formsData.editedAppointmentForm, setValue, data.appointments]);

  const addAppointment = (data: z.infer<typeof appointmentSchema>) => {
    const newId = crypto.randomUUID().toString();
    const newAppointment: AppointmentsProps = {
      id: newId,
      ...data,
      date: new Date(data.date).toISOString().split("T")[0],
    };
    setData("appointments", newAppointment);
    
    // Atualiza a lista de agendamentos após adicionar um novo
    const dateStr = new Date(data.date).toISOString().split("T")[0];
    const updatedAppointments = [...dayAppointments, newAppointment].filter(
      (appointment) => appointment.date === dateStr
    );
    setDayAppointments(updatedAppointments);
  };

  const updateAppointment = (data: z.infer<typeof appointmentSchema>) => {
    const editData = formsData.editedAppointmentForm;
    if (!editData) return;
    editData.date = new Date(data.date).toISOString().split("T")[0];

    updateData("appointments", editData.id, {
      ...data,
      date: new Date(data.date).toISOString().split("T")[0],
    });
    resetFormsDataProps("editedAppointmentForm");
  };

  const onSubmit = async (data: z.infer<typeof appointmentSchema>) => {
    setIsLoading(true);

    try {
      if (formsData.editedAppointmentForm) {
        updateAppointment(data);
      } else {
        addAppointment(data);
      }

      closeModal("AddAppointmentModal");
      resetFormsDataProps("editedAppointmentForm");
      reset({
        date: new Date(),
        status: "pending",
        servicesId: [],
        clientId: "",
        barberId: "",
      });
    } catch (error) {
      console.error("Error saving appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCloseModal = () => {
    resetFormsDataProps("editedAppointmentForm");
    reset({
      date: new Date(),
      status: "pending",
      servicesId: [],
      clientId: "",
      barberId: "",
    });
    closeModal("AddAppointmentModal");
  };

  return (
    <MainModal
      isOpen={modalsStates.AddAppointmentModal}
      onClose={onCloseModal}
      hasClose={true}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center">
          {formsData.editedAppointmentForm?.id
            ? "Editar Agendamento"
            : "Adicionar Novo Agendamento"}
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
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => date && setValue("date", date)}
              dateFormat="dd/MM/yyyy"
              locale="pt-BR"
              className="input input-bordered w-full focus:input-primary"
              placeholderText="DD/MM/AAAA"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}

            {/* Display appointments for selected date */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Agendamentos para esta data:</p>
              {dayAppointments.length === 0 ? (
                <p className="text-sm text-gray-500">Nenhum agendamento para este dia.</p>
              ) : (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {dayAppointments.map((appointment) => {
                    const client = data.clients.find(c => c.id === appointment.clientId);
                    const barber = data.barbers.find(b => b.id === appointment.barberId);
                    return (
                      <div key={appointment.id} className="p-2 bg-gray-50 rounded-md text-sm">
                        <p className="font-medium">{client?.name || 'Cliente não encontrado'}</p>
                        <p className="text-gray-600">Barbeiro: {barber?.name || 'Barbeiro não encontrado'}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
                <option value="">Selecione um cliente</option>
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
                <option value="">Selecione um barbeiro</option>
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const serviceId = e.target.value;
                    if (serviceId) {
                      const currentServices = watch("servicesId") || [];
                      if (!currentServices.includes(serviceId)) {
                        setValue(
                          "servicesId",
                          [...currentServices, serviceId] as [string, ...string[]]
                        );
                      }
                      // Limpar o select após adicionar o serviço
                      e.target.value = "";
                    }
                  }}
                  defaultValue=""
                >
                  <option value="">Selecione um serviço</option>
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
              
              {/* Selected Services List */}
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Serviços Selecionados:</p>
                <div className="space-y-2">
                  {watch("servicesId").map((serviceId) => {
                    const service = data.services.find((s) => s.id === serviceId);
                    if (!service) return null;
                    
                    return (
                      <div key={service.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <span className="text-sm">{service.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentServices = watch("servicesId");
                            setValue(
                              "servicesId",
                              currentServices.filter((id) => id !== service.id) as [string, ...string[]]
                            );
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {errors.servicesId && (
              <p className="text-red-500 text-sm">
                {errors.servicesId.message}
              </p>
            )}
          </div>

          {/* Status do Agendamento */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status do Agendamento
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("status")}
            >
              <option value="pending">Pendente</option>
              <option value="completed">Concluído</option>
              <option value="canceled">Cancelado</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
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
