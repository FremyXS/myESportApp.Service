import express from 'express'
import cors from 'cors'
const api = require('./routes/main-route')
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(api);
app.listen(PORT, () => console.log(`Server hosted in http://localhost:${PORT}`));