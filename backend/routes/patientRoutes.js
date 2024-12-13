import express from 'express';
const router = express.Router();
import { 
    createPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
} from '../controllers/patientController.js';
import checkAuth from '../middleware/authMiddleware.js';

router
    .route('/')
    .post(checkAuth, createPatient)
    .get(checkAuth, getPatients);

router
    .route('/:id')
    .get(checkAuth, getPatient)
    .put(checkAuth, updatePatient)
    .delete(checkAuth, deletePatient)

export default router;