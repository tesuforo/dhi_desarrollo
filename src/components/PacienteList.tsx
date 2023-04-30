import React from "react";
import { PacienteCard } from "./PacienteCard";
import { Paciente } from "../interfaces/Paciente";
import { BiTaskX } from "react-icons/bi";

interface Props {
  pacientes: Paciente[];
  deleteAPaciente: (id: number) => any;
}

export const PacienteList = ({ pacientes, deleteAPaciente }: Props): JSX.Element => {
  if (pacientes.length === 0)
    return (
      <div className="text-light text-center">
        <h1>There are no tasks yet</h1>
        <BiTaskX size="20rem" />
      </div>
    );

  return (
    <>
      {pacientes.map((paciente, i) => (
        <div className="col-md-4 mt-2">
          <PacienteCard key={paciente.id}  paciente={paciente} deleteAPaciente={deleteAPaciente} />
        </div>
      ))}
    </>
  );
};