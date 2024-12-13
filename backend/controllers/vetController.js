import Vet from "../models/Vet.js";
import jwt from "jsonwebtoken";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import registerEmail from "../helpers/registerEmail.js";
import forgotPasswordEmail from "../helpers/forgotPasswordEmail.js";

const register = async (req, res) => {
    const { email, name } = req.body;

    // Prevent duplicated users
    const userExists = await Vet.findOne({email}); // email: email

    if(userExists) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        // Save new vet
        const vet = new Vet(req.body);
        const savedVet = await vet.save();

        // Send email
        registerEmail({
            email,
            name,
            token: savedVet.token
        });

        res.json(savedVet);
    } catch (error) {
        console.log(error);
    }
};

const profile = (req, res) => {
    const { vet } = req;
    res.json(vet);
}

const confirm = async (req, res) => {
    const { token } = req.params;

    const userConfirm = await Vet.findOne({token});

    if(!userConfirm) {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }

    try {
        userConfirm.token = null;
        userConfirm.confirmed = true;
        await userConfirm.save();

        res.json({msg: 'Usuario confirmado correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const user = await Vet.findOne({email});
    if(!user) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    // Comprobar si el usuario esta confirmado 
    if(!user.confirmed) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(404).json({msg: error.message});
    }

    // Revisar el password
    if(await user.checkPassword(password)) {
        // Autenticar
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user.id),
        });
    } else {
        const error = new Error('Contraseña incorrecta');
        return res.status(404).json({msg: error.message});
    }
  
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    const existsVet = await Vet.findOne({ email });

    if(!existsVet) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message });
    }

    try {
        existsVet.token = generateId();
        await existsVet.save();

        forgotPasswordEmail({
            email,
            name: existsVet.name,
            token: existsVet.token
        })
        res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
        console.log(error);
    }
};

const checkToken = async (req, res) => {
    const { token } = req.params;
    
    const tokenIsValid = await Vet.findOne({ token });

    if(tokenIsValid) {
        res.json({ msg: 'Token valido y el usuario existe' });
    } else {
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }
};

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const vet = await Vet.findOne({ token });

    if(!vet) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        vet.token = null;
        vet.password = password;
        await vet.save();
        res.json({ msg: 'Contraseña modificada correctamente' });
    } catch (error) {
        console.log(error);
    }
};

const updateProfile = async (req, res) => {
    const vet = await Vet.findById(req.params.id);
    if(!vet) {
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }

    const { email } = req.body;
    if(vet.email !== req.body.email) {
        const emailExists = await Vet.findOne({email})
        if(emailExists) {
            const error = new Error('Ya existe un usuario con ese email')
            return res.status(400).json({msg: error.message})
        }
    }

    try {
        vet.name = req.body.name;
        vet.email = req.body.email;
        vet.web = req.body.web;
        vet.phone = req.body.phone;

        const updatedVet = await vet.save();
        res.json(updatedVet);
    } catch (error) {
        console.log(error);
    }
};

const updatePassword = async (req, res) => {
    // Leer los datos
    const { id } = req.vet;
    const { actual_pwd, new_pwd } = req.body;

    // Comprobar que el vet exista
    const vet = await Vet.findById(id);
    if(!vet) {
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }

    // Comprobar su pwd
    if(await vet.checkPassword(actual_pwd)) {
        // Almacenar pwd
        vet.password = new_pwd;
        await vet.save();
        res.json({msg: 'Contraseña almacenada correctamente'})
    } else {
        const error = new Error('La contraseña actual es incorrecta')
        return res.status(400).json({msg: error.message})
    }
};

export {
    register,
    profile,
    confirm,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword,
    updateProfile,
    updatePassword
}