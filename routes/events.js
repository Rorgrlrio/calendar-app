const { Router } = require("express");
const { check } = require("express-validator")
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validarJWT");
const { validarCampos } = require('../middlewares/validarCampos');
const { isDate } = require("../helpers/isDate");

//Obtener eventos SOLAMENTE si se valida el token

const router = Router();

router.use( validarJWT ); //Lo pasamos como middleware (validacion) a todas las rutas

router.get('/',  getEventos)

router.post('/', [
    check('title', 'Titulo obligatorio').not().isEmpty(),
    check('start', 'Fecha Inicio Obligatoria').custom( isDate ),
    check('end', 'Fecha Final Obligatoria').custom( isDate ),
    validarCampos
], crearEvento)

router.put('/:id',  actualizarEvento)

router.delete('/:id',  eliminarEvento)

module.exports = router;