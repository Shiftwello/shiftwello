import React, { useState, useEffect } from "react";
import { Calendar, Views } from "react-big-calendar";
import { localizer } from "../utils/calendarLocalizer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuth } from "../context/AuthContext";
import Modal from "react-modal";
import { format, startOfWeek, endOfWeek } from "date-fns";

Modal.setAppElement("#root");

function getHeaderTitle(view, date) {
  if (view === Views.MONTH) {
    return format(date, "MMMM yyyy");
  }
  if (view === Views.WEEK) {
    const start = startOfWeek(date);
    const end = endOfWeek(date);
    return `${format(start, "MMMM d")} - ${format(end, "MMMM d")}`;
  }
  if (view === Views.DAY) {
    return format(date, "EEEE MMMM d");
  }
  return "";
}

export default function SchedulePage() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const [formData, setFormData] = useState({
    employee_id: "",
    start_time: "",
    end_time: "",
    shift_type: "",
    notes: "",
  });

  const loadEvents = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5001/api/shifts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error cargando turnos");
      const data = await res.json();
      const evs = data.map((shift) => ({
        id: shift.id,
        title: `${shift.shift_type} - ${shift.full_name}`,
        start: new Date(shift.start_time),
        end: new Date(shift.end_time),
        notes: shift.notes,
        employee_id: shift.employee_id,
      }));
      setEvents(evs);
    } catch (error) {
      alert(error.message);
    }
  };

  const loadEmployees = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5001/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error cargando empleados");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadEvents();
    loadEmployees();
  }, [token]);

  const onSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      employee_id: event.employee_id,
      start_time: event.start.toISOString().slice(0, 16),
      end_time: event.end.toISOString().slice(0, 16),
      shift_type: event.title.split(" - ")[0],
      notes: event.notes || "",
    });
    setModalIsOpen(true);
  };

  const openNewShiftModal = () => {
    setSelectedEvent(null);
    setFormData({
      employee_id: "",
      start_time: "",
      end_time: "",
      shift_type: "",
      notes: "",
    });
    setModalIsOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.end_time) <= new Date(formData.start_time)) {
      alert("La fecha de fin debe ser posterior a la de inicio");
      return;
    }

    const method = selectedEvent ? "PUT" : "POST";
    const url = selectedEvent
      ? `http://localhost:5001/api/shifts/${selectedEvent.id}`
      : "http://localhost:5001/api/shifts";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al guardar turno: ${errorText}`);
      }

      setModalIsOpen(false);
      await loadEvents();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Calendario de Turnos</h1>
      <p className="text-center mb-6">Gestiona los turnos de los empleados aquí.</p>

      <button
        onClick={openNewShiftModal}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Crear nuevo turno
      </button>

      {/* Título dinámico del calendario */}
      <div className="mb-4 text-center font-semibold text-lg">
        {getHeaderTitle(view, date)}
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={view}
        date={date}
        onNavigate={handleNavigate}
        onView={setView}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        onSelectEvent={onSelectEvent}
        components={{
          toolbar: undefined // esto elimina la toolbar default si quieres ocultar
        }}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Crear o Editar Turno"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            position: "relative",
            inset: "auto",
            padding: "24px",
            maxWidth: "500px",
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">
          {selectedEvent ? "Editar Turno" : "Crear Turno"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Seleccione un empleado
            </option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name} - {emp.role_name}
              </option>
            ))}
          </select>

          <label>
            Inicio:
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            />
          </label>
          <label>
            Fin:
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            />
          </label>
          <input
            type="text"
            name="shift_type"
            value={formData.shift_type}
            onChange={handleChange}
            placeholder="Tipo de turno"
            required
            className="border px-3 py-2 rounded"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notas (opcional)"
            className="border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {selectedEvent ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}