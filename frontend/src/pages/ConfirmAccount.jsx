import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axiosClient from '../config/axios'
import Alert from '../components/Alert'

const ConfirmAccount = () => {
  const [confirmedAccount, setConfirmedAccount] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({})
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/vets/confirm/${id}`
        const { data } = await axiosClient(url)
        setConfirmedAccount(true)
        setAlert({
          msg: data.msg
        })
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }

      setLoading(false)
    }
    confirmAccount()
  }, [])
  

  return (
    <>
        <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirma tu Cuenta y Comienza a Administrar tus
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!loading && <Alert 
                  alert={alert}
                />}
            </div>
    </>
  )
}

export default ConfirmAccount