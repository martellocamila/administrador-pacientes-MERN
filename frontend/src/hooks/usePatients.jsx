import { useContext } from 'react'
import PatientsProvider from '../context/PatientsProvider'

const usePatients = () => {
    return useContext(PatientsProvider)
}

export default usePatients