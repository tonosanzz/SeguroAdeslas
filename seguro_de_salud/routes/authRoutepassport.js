const express = require('express');
const User = require('../models/user');
const router = express.Router();



router.post('/iniciodesesion/passport', async (req, res) => {
    console.log(req.body);
  try {
    const { passport } = req.body;
    const user = await User.findOne({ passport });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar contraseña sin hashear
    
    

    // Si todo es correcto, devolver el tipo de seguro al frontend
    res.json({ seguro: user.seguro, passport: user.passport });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
});

module.exports = router;