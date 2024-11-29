/*
    Rutas de Eventos / Events
    host + /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

//Todas tienen que pasar por la validacion del JWT
router.use( validarJWT );

//Obtener eventos
router.get('/', getEventos);

//Crear nuevo evento
router.post(
    '/',
    [
        //middleware
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de incio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
     crearEvento);

//Actualizar evento
router.put(
    '/:id',
    [
        //middleware
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de incio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ], 
    actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;