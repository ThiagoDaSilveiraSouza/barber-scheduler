import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useState, useEffect } from "react";
import { useDataStore } from "../../../store";
import { AppointmentsProps } from "../../../types";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { useFormsData } from "../../../store/useFormsData";

type AddScheduleModalProps = {
  selectedDate?: string;
};

export const AddScheduleModal = ({ selectedDate }: AddScheduleModalProps) => {
  const { modalsStates, closeModal, openModal } = useModals();
  const { data, deleteData } = useDataStore();
  const { setFormsData } = useFormsData();
  const [dayAppointments, setDayAppointments] = useState<AppointmentsProps[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const filteredAppointments = data.appointments.filter(
        (appointment) => appointment.date === selectedDate
      );
      setDayAppointments(filteredAppointments);
    }
  }, [selectedDate, data.appointments]);

  const handleAddAppointment = () => {
    if (selectedDate) {
      setFormsData("editedAppointmentForm", { date: selectedDate });
      closeModal("AddScheduleModal");
      openModal("AddAppointmentModal");
    }
  };

  const handleEditAppointment = (appointment: AppointmentsProps) => {
    setFormsData("editedAppointmentForm", appointment);
    closeModal("AddScheduleModal");
    openModal("AddAppointmentModal");
  };

  const handleDeleteAppointment = (id: string) => {
    deleteData("appointments", id);
  };

  const getClientName = (clientId: string) => {
    const client = data.clients.find((client) => client.id === clientId);
    return client ? client.name : "Cliente não encontrado";
  };

  const getBarberName = (barberId: string) => {
    const barber = data.barbers.find((barber) => barber.id === barberId);
    return barber ? barber.name : "Barbeiro não encontrado";
  };

  const getServicesNames = (servicesIds: string[]) => {
    return servicesIds
      .map((serviceId) => {
        const service = data.services.find((service) => service.id === serviceId);
        return service ? service.name : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <MainModal
      isOpen={modalsStates.AddScheduleModal}
      onClose={() => closeModal("AddScheduleModal")}
      hasClose={true}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center">
          Agendamentos para {selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : ''}
        </h2>

        {dayAppointments.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum agendamento para este dia.</p>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {dayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 border border-gray-200 rounded-md mb-2 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{getClientName(appointment.clientId)}</p>
                    <p className="text-sm text-gray-600">Barbeiro: {getBarberName(appointment.barberId)}</p>
                    <p className="text-sm text-gray-600">Serviços: {getServicesNames(appointment.servicesId)}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Status: 
                      <span className={`ml-1 ${appointment.status === 'completed' ? 'text-green-600' : appointment.status === 'canceled' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {appointment.status === 'completed' ? 'Concluído' : appointment.status === 'canceled' ? 'Cancelado' : 'Pendente'}
                      </span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAppointment(appointment)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleAddAppointment}
          className="flex items-center justify-center w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
        >
          <FiPlus className="mr-2" /> Adicionar Agendamento
        </button>
      </div>
    </MainModal>
  );
};
