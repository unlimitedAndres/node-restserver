const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'Correo no valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] , login);

router.post('/google', [
    check('id_token', 'Es necesario el token de Google').not().isEmpty(),
    validarCampos
] , googleSignIn);


module.exports = router;    