const express = require('express');
const mongoose = require('mongoose');
const authRoutedni = require('./routes/authRoutedni');
const authRoutepassport = require('./routes/authRoutepassport');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ClientesAdeslas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error(error));

const cors = require('cors');
app.use(cors());

// Usar las rutas de autenticación
app.use('/api/auth', authRoutedni);
app.use('/api/auth', authRoutepassport);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

