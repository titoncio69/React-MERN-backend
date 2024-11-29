/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
        '/new', 
        [   //middleware
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe tener 6 caracteres como minimo').isLength({ min: 6 }),
            validarCampos
        ] , 
        crearUsuario
);

router.post(
        '/', 
        [   //middleware
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe tener 6 caracteres como minimo').isLength({ min: 6 }),
            validarCampos
        ],
        loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;