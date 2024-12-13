import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(email === '') {
            setAlert({
                msg: 'El email no puede estar vacio',
                error: true
            })
            return 
        }

        try {
            const { data } = await axiosClient.post('/vets/forgot-password', { email })
            setAlert({msg: data.msg})
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
                Recupera tu Acceso y no pierdas tus 
                <span className="text-black"> Pacientes</span>
            </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg && <Alert
                alert={alert}
            />}

            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        placeholder="Email de Registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Enviar"
                    className="bg-indigo-800 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto"
                />
            </form>

            
            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link 
                    to="/" 
                    className="block text-center my-5 text-gray-500"
                >
                    Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link 
                    to="/register"
                    className="block text-center my-5 text-gray-500"
                    >
                        No tienes una cuenta? Regístrate
                </Link>
            </nav>
        </div>
    </>
  )
}

export default ForgotPassword