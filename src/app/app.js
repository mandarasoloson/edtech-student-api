import express from 'express';
import studentRoutes from '../routes/students.js';

const app = express();
app.use(express.json());
app.use('/api/students', studentRoutes);

export default app;