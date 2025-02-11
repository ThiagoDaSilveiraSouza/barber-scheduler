import { MainModal } from "../../MainModal";
import { useModals } from "../../../store/useModals";
import { useFormsData } from "../../../store/useFormsData";
import { useDataStore } from "../../../store";

export const AddAppointmentModal = () => {
  const { modalsStates, closeModal } = useModals();
  const { formsData } = useFormsData();
  const { data } = useDataStore();

  const selectedDate =
    formsData?.editedAppointmentForm?.date.toISOString().split("T")[0] ||
    new Date().toISOString().split("T")[0];

  const appointmentsOnSelectedDate = data.appointments.filter((appointment) => {
    console.group("aqui");
    console.log("appointment", appointment);
    const currentAppointmentDate =
      formsData?.editedAppointmentForm?.date.toISOString();

    const selectedDate = appointment.date.toString();
    console.log("selectedDate", selectedDate);
    console.log("currentAppointmentDate", currentAppointmentDate);
    console.groupEnd();
    return currentAppointmentDate === selectedDate;
  });

  appointmentsOnSelectedDate.forEach((appointment) => {
    console.log(appointment.date);
  });

  console.log(data.appointments);
  const onCloseModal = () => {
    closeModal("AddAppointmentModal");
  };

  return (
    <MainModal
      isOpen={modalsStates.AddAppointmentModal}
      onClose={onCloseModal}
      hasClose={true}
    >
      <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-semibold text-center">
          Agendamentos para {selectedDate}
        </h2>
        <div className="flex flex-col space-y-2 max-w-100px overflow-auto">
          {data.appointments.length > 0 ? (
            <ul className="space-y-2">
              {appointmentsOnSelectedDate.map((appointment, index) => (
                <li
                  key={appointment.id + index}
                  className="p-2 border rounded-md shadow-sm"
                >
                  <p className="font-medium">{appointment.client.name}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.date.getHours()} -{" "}
                    {appointment.services
                      .map((service) => service.name)
                      .join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              Nenhum agendamento para este dia.
            </p>
          )}
        </div>

        <button
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          onClick={() => closeModal("AddAppointmentModal")}
        >
          Adicionar Agendamento
        </button>
      </div>
    </MainModal>
  );
};
