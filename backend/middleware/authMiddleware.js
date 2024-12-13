import jwt from 'jsonwebtoken';
import Vet from '../models/Vet.js';

const checkAuth = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.vet = await Vet.findById(decoded.id).select('-password -token -confirmed'); // crea una sesion con la info del vet

            return next();
        } catch (error) {
            e = new Error('Token no valido');
            req.status(403).json({msg: e.message});
        }
    }

    if(!token) {
        const error = new Error('Token no valido o inexistente');
        return res.status(403).json({msg: error.message});
    }

    next();
};

export default checkAuth;