const { Router } = require('express');
const router = Router();

const {listar_usuario,modificar_usuario} = require('../controllers/Usuarios/usuarios_controller');

//Obtener recursos
router.get('/Datos/:id_user', listar_usuario);
//Editar recursos
router.put('/Modificar',modificar_usuario);


module.exports = router;