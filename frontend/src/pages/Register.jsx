import { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../config/axios'
import Alert from '../components/Alert'

const Register = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatedPassword, setRepeatedPassword ] = useState('');

    const [ alert, setAlert ] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if([name, email, password, repeatedPassword].includes('')) {
            setAlert({ msg: 'Hay campos vacios', error: true });
            return;
        }

        if(password !== repeatedPassword) {
            setAlert({ msg: 'Las contraseñas deben coincidir', error: true });
            return;
        }

        if(password.length < 6) {
            setAlert({ msg: 'La contraseña debe tener 6 dígitos o mas', error: true });
            return;
        }

        setAlert({});

        // Crear el user en la api
        try {
            await axiosClient.post('/vets', { name, email, password });
            setAlert({
                msg: 'creado correctamente, revisa tu email',
                error: false
            })
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu Cuenta y Administra tus
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                { msg && <Alert // si en msg hay algo entonces muestra el componente
                    alert={alert}
                />}
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
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
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            placeholder="Tu Contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Confirmar Contraseña
                        </label>
                        <input 
                            type="password" 
                            placeholder="Repite tu Contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repeatedPassword}
                            onChange={e => setRepeatedPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Crear Cuenta"
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
                        to="/forgot-password"
                        className="block text-center my-5 text-gray-500"
                        >
                            Olvide mi Password
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Register