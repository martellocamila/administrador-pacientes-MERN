import { useState } from 'react'
import AdminNav from "../components/AdminNav"
import Alert from "../components/Alert"
import useAuth from '../hooks/useAuth'

const ChangePassword = () => {
  const { savePassword } = useAuth()

  const [ alert, setAlert ] = useState({})
  const [ password, setPassword ] = useState({
    actual_pwd: '',
    new_pwd: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    if(Object.values(password).some(field => field === '')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return 
    }

    if(password.new_pwd.length < 6) {
      setAlert({
        msg: 'La contraseña debe tener como minimo 6 caracteres',
        error: true
      })
      return 
    }

    const result = await savePassword(password)
    setAlert(result)
  }

  const { msg } = alert

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Contraseña aqui</span></p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alert alert={alert} />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Contraseña Actual</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder='Escribe tu contraseña actual'
                            name="actual_pwd"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Nueva Contraseña</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder='Escribe tu nueva contraseña'
                            name="new_pwd"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name]: e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Guardar Cambios"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5" 
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default ChangePassword