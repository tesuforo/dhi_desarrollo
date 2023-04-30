import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Paciente } from "../interfaces/Paciente";
import { AiOutlinePlus } from "react-icons/ai";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';

interface Props {
  addANewPaciente: (paciente: Paciente) => void;
}


type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
  title: "",
  description: "",
  identificacion:"",
};

export const PacienteForm = ({ addANewPaciente }: Props) => {
  const [paciente, setPaciente] = useState<Paciente>(inititalState);
  const titleInput = useRef<HTMLInputElement>(null);

  const handleNewPaciente = (e: FormEvent<HTMLFormElement>): any => {
    e.preventDefault();
    addANewPaciente(paciente);
    setPaciente(inititalState);
   
    titleInput.current?.focus();
  };

  const handleInputChange = ({ target: { name, value } }: HandleInputChange) =>
    setPaciente({ ...paciente, [name]: value });

  return (
    <div className="grid">
    <div className="col-12 md:col-6">
        <div className="card p-fluid">
            <h5>Paciente DHI</h5>
    

      <form onSubmit={handleNewPaciente}>
        <input
          type="text"
          placeholder="Digite la titulo"
          name="title"
          onChange={handleInputChange}
          value={paciente.title}
          className="field"
          autoFocus
          ref={titleInput}
        />


<input
          type="text"
          placeholder="Digite la identificación"
          name="identificacion"
          onChange={handleInputChange}
          value={paciente.identificacion}
          className="field"
          
          
        />

         
     

        <textarea
          onChange={handleInputChange}
          name="description"
          className="form-control mb-3 shadow-none border-0"
          placeholder="Write a Description"
          value={paciente.description}
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Guardar <AiOutlinePlus />
        </button>
      </form>
    </div>

    </div>
    </div>
  );
};