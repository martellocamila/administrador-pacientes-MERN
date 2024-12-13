import { createContext, useState, useEffect } from 'react'
import axiosClient from '../config/axios'
import useAuth from '../hooks/useAuth'

const PatientsContext = createContext()

export const PatientsProvider = ({children}) => {
    const [ patients, setPatients ] = useState([])
    const [ patient, setPatient ] = useState([])
    const { auth } = useAuth()
    const [ loading, setLoading ] = useState([])

    useEffect(() => {
      const getPatients = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient('/patients', config)
            setPatients(data, ...patients)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
      }
      getPatients()
    }, [auth])
    
    const savePatient = async (patient) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(patient.id) {
            try {
                const { data } = await axiosClient.put(`/patients/${patient.id}`, patient, config) 
                
                const updatedPatients = patients.map( patientState => patientState._id === data._id ? data : patientState)
                setPatients(updatedPatients)
            } catch (error) {
                
            }
        } else {
            try {
                const { data } = await axiosClient.post('/patients', patient, config)
                const { createdAt, updatedAt, __v, ...savedPatient } = data // crea el objeto savedPatient con lo que no esta antes de la ,
                setPatients([savedPatient, ...patients])
            } catch (error) {
                console.log(error.response.data.msg)
            }   
        }
    }

    const setEdition = (patient) => {
        setPatient(patient)
    }

    const deletePatient = async id => {
        const confirmDelete = confirm('¿Deseas eliminar el paciente?')

        if(confirmDelete) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axiosClient.delete(`/patients/${id}`, config)
                const updatedPatients = patients.filter( patientState => patientState._id !== id)
                setPatients(updatedPatients)
                
            } catch (error) {
                console.log(error) 
            }
        }
    }

    return(
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEdition,
                patient,
                deletePatient,
                loading
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext