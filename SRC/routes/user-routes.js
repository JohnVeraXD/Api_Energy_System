const { Router } = require('express');
const router = Router();

const {listar_usuario,modificar_usuario,listar_Token, crear_token} = require('../controllers/Usuarios/usuarios_controller');

//Obtener recursos
router.get('/Datos/:id_user', listar_usuario);
//Editar recursos
router.put('/Modificar',modificar_usuario);
//Leer Token
router.get('/Token/:id_user', listar_Token);
//Genera Token
router.post('/Crear_token', crear_token);

module.exports = router;