import { Paciente } from "../interfaces/Paciente";

interface Props {
  paciente: Paciente;
  deleteAPaciente: (id: number) => void;
}

export const PacienteCard = ({ paciente, deleteAPaciente }: Props) => (
  <div className="card card-body bg-secondary rounded-0">
    <h3>{paciente.title}</h3>
    <p>{paciente.id}</p>
    <p>{paciente.description}</p>
    <h4>identificacion</h4>
    <p>{paciente.identificacion}</p>

    <button
      className="btn btn-danger btn-block"
      onClick={() => paciente.id && deleteAPaciente(paciente.id)}
    >
      Delete
    </button>
  </div>
);
