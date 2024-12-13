import usePatients from "../hooks/usePatients"
import Patient from "./Patient"

const PatientsList = () => {
  const { patients, loading } = usePatients()

  return (
    <>
      { !loading && patients.length ? 
      (
        <>
          <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {patients.map( patient => (
            <Patient 
              key={patient._id}
              patient={patient}
            />
          ))}
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Agrega pacientes {''}
            <span className="text-indigo-600 font-bold">y apareceran aquí</span>
          </p>
        </>
      )}
    </>
  )
}

export default PatientsList