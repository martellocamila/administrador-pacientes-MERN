import express from 'express';
import { 
    register, 
    profile, 
    confirm, 
    authenticate, 
    forgotPassword, 
    checkToken, 
    newPassword,
    updateProfile,
    updatePassword
} from '../controllers/vetController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// areas publicas
router.post('/', register);
router.get('/confirm/:token', confirm); 
router.post('/login', authenticate);
router.post('/forgot-password', forgotPassword); // validar email del usuario
/*router.get('/forgot-password/:token', checkToken); // leer token
router.post('/forgot-password/:token', newPassword); // almacenar nuevo password */
router.route('/forgot-password/:token').get(checkToken).post(newPassword);

// areas con autenticacion
router.get('/profile', checkAuth, profile);
router.put('/profile/:id', checkAuth, updateProfile);
router.put('/update-password', checkAuth, updatePassword);

export default router;