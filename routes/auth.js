const {Router} = require('express');
const { crearUsuario, renewToken, loginUser } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

//Aqui usaremos las rutas de la auth, vienen del index.js, quedarían algo como '/api/auth' + 'estas rutas'

// router.get( '/', (req, res) => { //Esta ruta del router sería llamada como '/api/auth' + '/', ya que se llama desde el index.js
//     res.json({
//         ok:true
//     })
// })

router.post( '/',
    [
        check('email', 'Email Obligatorio').isEmail(),
        check('password', 'Minimo 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    loginUser) //Llamamos las funciones de nuestro "controlador"

router.post( '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Email Obligatorio').isEmail(),
        check('password', 'Minimo 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario);

router.get( '/renew', validarJWT, renewToken);

module.exports = router;