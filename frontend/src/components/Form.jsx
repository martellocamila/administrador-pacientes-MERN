import { useState, useEffect } from "react";
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";

const Form = () => {
  const [ name, setName ] = useState("");
  const [ owner, setOwner ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ date, setDate ] = useState("");
  const [ symptoms, setSymptoms ] = useState("");
  const [ id, setId ] = useState(null)

  const [alert, setAlert] = useState({});

  const { savePatient, patient } = usePatients();

  useEffect(() => {
    if(patient?.name) {
      setName(patient.name)
      setOwner(patient.owner)
      setEmail(patient.email)
      setDate(patient.date)
      setSymptoms(patient.symptoms)
      setId(patient._id)
    }
  }, [patient])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if ([name, owner, email, date, symptoms].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlert({});

    savePatient({ name, owner, email, date, symptoms, id });
    setAlert({
      msg: 'Guardado Correctamente'
    })
    setName('')
    setOwner('')
    setEmail('')
    setDate('')
    setSymptoms('')
    setId('')
  };

  const { msg } = alert;

  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            type="text"
            id="propietario"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email del Propietario
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">
            Fecha de Alta
          </label>
          <input
            type="date"
            id="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
        />
      </form>

      {msg && <Alert alert={alert} />}
    </>
  );
};

export default Form;
