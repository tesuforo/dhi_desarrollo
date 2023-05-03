
import { Paciente } from "./interfaces/Paciente";
import { PacienteList} from "./components/PacienteList";
import logo from "./logo.svg";
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../layout/context/layoutcontext';
import { ProductService } from '../demo/service/ProductService';
import Link from 'next/link';
import { Demo } from '../types/types';  


// Components
import { PacienteForm } from "./components/PacienteForm";



interface Props {
  title?: string;
}



export const App = ({ title = "default title" }: Props): JSX.Element => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const getCurrentTimestamp = (): number => new Date().getTime();

  const addANewPaciente = (paciente: Paciente): void =>
    setPacientes([
      ...pacientes,
      { ...paciente, completed: false, id: getCurrentTimestamp() },
    ]);

  const deleteAPaciente = (id: number): void =>
    setPacientes(pacientes.filter((paciente) => paciente.id !== id));

  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="React Logo" style={{ width: "4rem" }} />
            {title}
          </a>
        </div>
      </nav>






      <main className="container p-4">
        <div className="row">
          <div className="col-md-4">
            <PacienteForm addANewPaciente={addANewPaciente} />
          </div>
          <div className="col-md-8">
            <div className="row">
              <h6 className="text-light d-flex justify-content-end">
                Total pacientes <span className="badge bg-primary ms-2">{pacientes.length}</span>
              </h6>

              <PacienteList pacientes={pacientes} deleteAPaciente={deleteAPaciente} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

