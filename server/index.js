const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const flowersRoutes = require('./routes/flowers');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/flowers', flowersRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
