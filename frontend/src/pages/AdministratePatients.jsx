import { useState } from 'react'
import Form from "../components/Form"
import PatientsList from "../components/PatientsList"

const AdministratePatients = () => {
  const [ showForm, setShowForm ] = useState(false)
  
  return (
    <div className="flex flex-col md:flex-row">
      <button 
        type="button"
        className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden'
        onClick={() => setShowForm(!showForm)}
      >{showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      <div className={`${showForm ? 'block' : 'hidden'} md:w-1/2 lg:w-2/5 md:block`}>
        <Form />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <PatientsList />
      </div>
    </div>
  )
}

export default AdministratePatients