const { Router } = require('express');
const router = Router();

const {iniciarUserGoogle, iniciarUser, registrarUser } = require('../controllers/Auth/auth-controller');

router.post('/LoginGoogle',iniciarUserGoogle);
router.post('/Login',iniciarUser);
router.post('/RegistrarUser',registrarUser);

module.exports = router;