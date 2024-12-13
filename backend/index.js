import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectDB from "./config/db.js";
import vetRoutes from './routes/vetRoutes.js';
import patientRoutes from './routes/patientRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
conectDB();

const allowedDomains= [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback) {
        if(allowedDomains.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/vets', vetRoutes);
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});