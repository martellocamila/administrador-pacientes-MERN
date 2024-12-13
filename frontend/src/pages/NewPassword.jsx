import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alert from "../components/Alert"
import axiosClient from "../config/axios"

const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [validToken, setValidToken] = useState(false)
  const [modifiedPassword, setModifiedPassword] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const checkToken = async () => {
        try {
            await axiosClient(`/vets/forgot-password/${token}`)
            setAlert({msg: 'Coloca tu nuevo password'})
            setValidToken(true)
        } catch (error) {
            setAlert({
                msg: 'Hubo un error con el enlace',
                error: true
            })
        }
    }
    checkToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6) {
        setAlert({
            msg: 'La contraseña debe tener 6 digitos o mas',
            error: true
        })
        return
    }

    try {
        const url = `/vets/forgot-password/${token}`
        const { data } = await axiosClient.post(url, { password })

        setAlert({
            msg: data.msg
        })
        setModifiedPassword(true)
    } catch (error) {
        setAlert({
            msg: error.response.data.msg,
            error: true
        })
    }
  }
  
  const { msg } = alert

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Reestablece tu contraseña y no pierdas acceso a tus 
                <span className="text-black"> Pacientes</span>
            </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            { msg && <Alert // si en msg hay algo entonces muestra el componente
                alert={alert}
            />}

            { validToken && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label 
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >
                                Nueva Contraseña
                            </label>
                            <input 
                                type="password" 
                                placeholder="Tu Nueva Contraseña"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <input 
                                type="submit" 
                                value="Reestablecer Contraseña"
                                className="bg-indigo-800 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto"
                            />
                        </div>
                    </form>

                    {modifiedPassword && (
                        <nav className='lg:flex lg:justify-between'>
                            <Link 
                                to="/" 
                                className="block text-center my-5 text-gray-500"
                            >
                                Iniciar Sesión
                            </Link>
                        </nav>
                    )}
                    
                </>
            )}

        </div>
    </>
  )
}

export default NewPassword